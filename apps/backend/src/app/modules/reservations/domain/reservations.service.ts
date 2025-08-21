import { BadRequestException, Inject, NotFoundException } from '@nestjs/common';
import { UsersService } from '../../users/domain/users.service';
import { AccommodationsService } from '../../accommodations/domain/accomodations.service';
import {
  AccommodationStatus,
  CreateReservationDto, ReadReservationsDto,
  ReservationStatus,
  UpdateReservationDto,
  UserRoles
} from '@bookings-app/shared-types';
import { Reservation } from './reservation';
import { v4 as uuid } from 'uuid';
import {
  IReservationsRepository,
  IReservationsRepositoryToken,
} from './reservations.repository.interface';

export class ReservationsService {
  constructor(
    @Inject(IReservationsRepositoryToken)
    private readonly repository: IReservationsRepository,
    @Inject(UsersService)
    private readonly usersService: UsersService,
    @Inject(AccommodationsService)
    private readonly accommodationsService: AccommodationsService
  ) {}

  async create(dto: CreateReservationDto) {
    const user = await this.usersService.getUserById(dto.userId);
    const accommodation = await this.accommodationsService.getById(
      dto.accommodationId
    );
    if (user.role !== UserRoles.USER) {
      throw new BadRequestException('User is not a customer');
    }
    if (accommodation.status !== AccommodationStatus.ACTIVE) {
      throw new BadRequestException('Accommodation is not available');
    }
    if (dto.checkIn >= dto.checkOut) {
      throw new BadRequestException('Check-in must be before check-out');
    }
    if (dto.checkIn < new Date()) {
      throw new BadRequestException('Check-in date must be in the future');
    }
    const nights = Math.ceil(
      (dto.checkOut.getTime() - dto.checkIn.getTime()) / (1000 * 60 * 60 * 24)
    );
    if (nights <= 0) {
      throw new BadRequestException('Reservation must be at least 1 night');
    }
    if (nights > 30) {
      throw new BadRequestException('Reservation cannot exceed 30 nights');
    }
    const expectedPrice = nights * accommodation.pricePerNight;
    if (dto.totalPrice !== expectedPrice) {
      throw new BadRequestException('Invalid total price');
    }
    const { total } = await this.repository.find({
      checkIn: dto.checkIn,
      checkOut: dto.checkOut,
      accommodation: dto.accommodationId,
    });
    if (total > 0) {
      throw new BadRequestException(
        'Accommodation is not available on the selected period'
      );
    }

    const domain = new Reservation(
      uuid(),
      dto.userId,
      dto.accommodationId,
      dto.checkIn,
      dto.checkOut,
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
      throw new BadRequestException('You are not authorized to update this reservation');
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
      throw new BadRequestException('You are not authorized to delete this reservation');
    }
    return this.repository.delete(id);
  }

  async findBy(dto: ReadReservationsDto){
    const { reservations, total } = await this.repository.find(dto);
    return {
      data: reservations,
      meta: {
        total,
        page: dto.page,
        pageSize: dto.pageSize,
      },
    }
  }

  async findById(id: string) {
    const domain = await this.repository.findById(id);
    if (!domain) {
      throw new NotFoundException('Reservation not found')
    }
    return domain;
  }

}
