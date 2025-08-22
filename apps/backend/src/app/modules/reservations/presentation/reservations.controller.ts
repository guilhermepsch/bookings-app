import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  Request,
} from '@nestjs/common';
import { RequestWithUser } from '../../../common/guards/auth.guard';
import { ZodPipe } from 'src/app/common/pipes/zod-validation.pipe';
import {
  CreateReservationDto,
  CreateReservationSchema,
  IdParamUuidDto,
  IdParamUuidSchema,
  ReadReservationsDto,
  ReadReservationsSchema,
  UpdateReservationDto,
  UpdateReservationSchema,
  UserRoles,
} from '@bookings-app/shared-types';
import { ReservationsService } from '../domain/reservations.service';
import { Roles } from '../../../common/decorators/roles.decorator';
import { Public } from '../../../common/decorators/is-public.decorator';

@Controller('reservations')
export class ReservationsController {
  constructor(private readonly service: ReservationsService) {}

  @Roles(UserRoles.USER)
  @Post()
  async create(
    @Body(new ZodPipe(CreateReservationSchema)) body: CreateReservationDto
  ) {
    return await this.service.create(body);
  }

  @Public()
  @Get()
  async findAll(
    @Query(new ZodPipe(ReadReservationsSchema)) query: ReadReservationsDto
  ) {
    return await this.service.findBy(query);
  }

  @Public()
  @Get(':id')
  async findOne(@Param(new ZodPipe(IdParamUuidSchema)) params: IdParamUuidDto) {
    return await this.service.findById(params.id);
  }

  @Roles(UserRoles.USER)
  @Put(':id')
  async update(
    @Param(new ZodPipe(IdParamUuidSchema)) params: IdParamUuidDto,
    @Body(new ZodPipe(UpdateReservationSchema)) body: UpdateReservationDto,
    @Request() req: RequestWithUser
  ) {
    return await this.service.update(params.id, req.user.sub, body);
  }

  @Roles(UserRoles.USER)
  @Delete(':id')
  async delete(
    @Param(new ZodPipe(IdParamUuidSchema)) params: IdParamUuidDto,
    @Request() req: RequestWithUser
  ) {
    await this.service.delete(params.id, req.user.sub);
  }
}
