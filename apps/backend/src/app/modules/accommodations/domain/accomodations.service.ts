import { BadRequestException, Inject, NotFoundException } from '@nestjs/common';
import {
  IAccommodationsRepository,
  IAccommodationsRepositoryToken,
} from './accomodations.repository.interface';
import {
  CreateAccomodationDto, ReadAccommodationDto,
  UpdateAccommodationDto, UserRoles
} from '@bookings-app/shared-types';
import { Accommodation } from './accomodation';
import { v4 as uuid } from 'uuid';
import { UsersService } from '../../users/domain/users.service';

export class AccommodationsService {
  constructor(
    @Inject(IAccommodationsRepositoryToken)
    private readonly repository: IAccommodationsRepository,
    @Inject(UsersService)
    private readonly usersService: UsersService
  ) {}

  async create(dto: CreateAccomodationDto): Promise<Accommodation> {
    const user = await this.usersService.getUserById(dto.userId);
    if (user.role !== UserRoles.ADMIN) {
      throw new BadRequestException('User is not an admin');
    }

    const domainAccommodation = new Accommodation(
      uuid(),
      dto.type,
      dto.description,
      dto.capacity,
      dto.streetType,
      dto.street,
      dto.number,
      dto.district,
      dto.city,
      dto.state,
      dto.complement,
      dto.zipCode,
      dto.latitude,
      dto.longitude,
      dto.pricePerNight,
      dto.status,
      dto.userId,
      [],
      new Date(),
      new Date()
    );
    return this.repository.create(domainAccommodation);
  }

  async update(
    id: string,
    userId: string,
    dto: UpdateAccommodationDto
  ): Promise<Accommodation> {
    const accommodation = await this.repository.findById(id);
    if (!accommodation) {
      throw new NotFoundException('Accommodation not found');
    }
    if (userId !== accommodation.userId) {
      throw new BadRequestException('You do not have permission to update this accommodation');
    }
    const domainAccommodation = new Accommodation(
      id,
      dto.type ? dto.type : accommodation.type,
      dto.description ? dto.description : accommodation.description,
      dto.capacity ? dto.capacity : accommodation.capacity,
      dto.streetType ? dto.streetType : accommodation.streetType,
      dto.street ? dto.street : accommodation.street,
      dto.number ? dto.number : accommodation.number,
      dto.district ? dto.district : accommodation.district,
      dto.city ? dto.city : accommodation.city,
      dto.state ? dto.state : accommodation.state,
      dto.complement ? dto.complement : accommodation.complement,
      dto.zipCode ? dto.zipCode : accommodation.zipCode,
      dto.latitude ? dto.latitude : accommodation.latitude,
      dto.longitude ? dto.longitude : accommodation.longitude,
      dto.pricePerNight ? dto.pricePerNight : accommodation.pricePerNight,
      dto.status ? dto.status : accommodation.status,
      accommodation.userId,
      [],
      accommodation.createdAt,
      new Date()
    );
    return this.repository.update(domainAccommodation);
  }

  async findAll(dto: ReadAccommodationDto) {
    const { accommodations, total } = await this.repository.findAll(dto);
    return {
      data: accommodations,
      meta: {
        total,
        page: dto.page,
        pageSize: dto.pageSize,
      },
    }
  }

  async getById(id: string): Promise<Accommodation> {
    const accommodation = await this.repository.findById(id);
    if (!accommodation) {
      throw new NotFoundException('Accommodation not found');
    }
    return accommodation;
  }

  async delete(id: string, userId: string): Promise<void> {
    const accommodation = await this.repository.findById(id);
    if (!accommodation) {
      throw new NotFoundException('Accommodation not found');
    }
    if (accommodation.userId !== userId) {
      throw new BadRequestException('You do not have permission to delete this accommodation');
    }
    return this.repository.delete(id);
  }
}
