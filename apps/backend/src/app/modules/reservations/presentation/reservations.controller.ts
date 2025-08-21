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
import { Public } from 'src/app/common/decorators/is-public.decorator';
import { ZodPipe } from 'src/app/common/pipes/zod-validation.pipe';
import {
  IdParamUuidSchema,
  IdParamUuidDto,
  CreateReservationSchema,
  CreateReservationDto,
  ReadReservationsDto,
  ReadReservationsSchema,
  UpdateReservationDto,
  UpdateReservationSchema,
} from '@bookings-app/shared-types';
import { ReservationsService } from '../domain/reservations.service';

@Controller('reservations')
export class ReservationsController {
  constructor(private readonly service: ReservationsService) {}

  @Post()
  async create(@Body(new ZodPipe(CreateReservationSchema)) body: CreateReservationDto) {
    return await this.service.create(body);
  }

  @Get()
  async findAll(@Query(new ZodPipe(ReadReservationsSchema)) query: ReadReservationsDto) {
    return await this.service.findBy(query);
  }

  @Get(':id')
  async findOne(@Param(new ZodPipe(IdParamUuidSchema)) params: IdParamUuidDto) {
    return await this.service.findById(params.id);
  }

  @Put(':id')
  async update(
    @Param(new ZodPipe(IdParamUuidSchema)) params: IdParamUuidDto,
    @Body(new ZodPipe(UpdateReservationSchema)) body: UpdateReservationDto,
    @Request() req: RequestWithUser
  ) {
    return await this.service.update(params.id, req.user.sub, body);
  }

  @Delete(':id')
  async delete(@Param(new ZodPipe(IdParamUuidSchema)) params: IdParamUuidDto, @Request() req: RequestWithUser) {
    await this.service.delete(params.id, req.user.sub);
  }
}
