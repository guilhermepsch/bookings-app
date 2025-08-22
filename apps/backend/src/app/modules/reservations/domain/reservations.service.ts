import { BadRequestException, Inject, NotFoundException } from '@nestjs/common';
import { UsersService } from '../../users/domain/users.service';
import { AccommodationsService } from '../../accommodations/domain/accomodations.service';
import {
  AccommodationStatus,
  CreateReservationDto,
  ReadReservationsDto,
  ReservationStatus,
  UpdateReservationDto
} from '@bookings-app/shared-types';
import { Reservation } from './reservation';
import { v4 as uuid } from 'uuid';
import { IReservationsRepository, IReservationsRepositoryToken } from './reservations.repository.interface';

export class ReservationsService {
  constructor(
    @Inject(IReservationsRepositoryToken)
    private readonly repository: IReservationsRepository,
    @Inject(UsersService)
    private readonly usersService: UsersService,
    @Inject(AccommodationsService)
    private readonly accommodationsService: AccommodationsService
  ) {}

  async create(dto: CreateReservationDto, userId: string) {
    const accommodation = await this.accommodationsService.getById(
      dto.accommodationId
    );
    const checkIn = new Date(dto.checkIn);
    const checkOut = new Date(dto.checkOut);
    if (accommodation.status !== AccommodationStatus.ACTIVE) {
      throw new BadRequestException('Accommodation is not available');
    }
    if (checkIn >= checkOut) {
      throw new BadRequestException('Check-in must be before check-out');
    }
    if (checkIn < new Date()) {
      throw new BadRequestException('Check-in date must be in the future');
    }
    const nights = Math.ceil(
      (checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24)
    );
    if (nights <= 0) {
      throw new BadRequestException('Reservation must be at least 1 night');
    }
    if (nights > 30) {
      throw new BadRequestException('Reservation cannot exceed 30 nights');
    }
    const expectedPrice = nights * accommodation.pricePerNight;
    if (dto.totalPrice !== expectedPrice) {
      throw new BadRequestException('Invalid total price, expected: ' + expectedPrice);
    }
    const { total } = await this.repository.find({
      checkIn: checkIn,
      checkOut: checkOut,
      accommodation: dto.accommodationId,
    });
    if (total > 0) {
      throw new BadRequestException(
        'Accommodation is not available on the selected period'
      );
    }

    const domain = new Reservation(
      uuid(),
      userId,
      dto.accommodationId,
      checkIn,
      checkOut,
      expectedPrice,
      dto.status ?? ReservationStatus.CONFIRMED,
      new Date(),
      new Date()
    );

    return this.repository.save(domain);
  }

  async update(id: string, userId: string, dto: UpdateReservationDto) {
    const domain = await this.repository.findById(id);
    if (!domain) {
      throw new NotFoundException('Reservation not found');
    }
    if (domain.userId !== userId) {
      throw new BadRequestException(
        'You are not authorized to update this reservation'
      );
    }
    if (domain.status === ReservationStatus.CANCELED){
      throw new BadRequestException('You cannot update a canceled reservation');
    }
    const now = new Date();
    if (now.getTime() - domain.createdAt.getTime() > 24 * 60 * 60 * 1000) {
      throw new BadRequestException('You cannot update a reservation that was made more than 24 hours ago');
    }
    const updatedDomain = new Reservation(
      domain.id,
      domain.userId,
      domain.accommodationId,
      domain.checkIn,
      domain.checkOut,
      domain.totalPrice,
      dto.status,
      domain.createdAt,
      new Date()
    );
    return this.repository.update(updatedDomain);
  }

  async delete(id: string, userId: string) {
    const domain = await this.repository.findById(id);
    if (!domain) {
      throw new NotFoundException('Reservation not found');
    }
    if (domain.userId !== userId) {
      throw new BadRequestException(
        'You are not authorized to delete this reservation'
      );
    }
    return this.repository.delete(id);
  }

  async findBy(dto: ReadReservationsDto) {
    const { reservations, total } = await this.repository.find(dto);
    return {
      data: reservations,
      meta: {
        total,
        page: dto.page,
        pageSize: dto.pageSize,
      },
    };
  }

  async findById(id: string) {
    const domain = await this.repository.findById(id);
    if (!domain) {
      throw new NotFoundException('Reservation not found');
    }
    return domain;
  }
}
