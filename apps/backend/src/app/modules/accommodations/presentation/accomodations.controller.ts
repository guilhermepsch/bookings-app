import { Body, Controller, Delete, Get, Param, Post, Put, Query, Request } from '@nestjs/common';
import { Public } from 'src/app/common/decorators/is-public.decorator';
import { ZodPipe } from 'src/app/common/pipes/zod-validation.pipe';
import {
  CreateAccommodationSchema,
  CreateAccomodationDto,
  IdParamUuidDto,
  IdParamUuidSchema, ReadAccommodationDto, ReadAccommodationSchema, UpdateAccommodationDto, UpdateAccommodationSchema
} from '@bookings-app/shared-types';
import { AccommodationsService } from '../domain/accomodations.service';
import { RequestWithUser } from '../../../common/guards/auth.guard';

@Controller('accommodations')
export class AccommodationsController {
  constructor(private readonly accommodationsService: AccommodationsService) {}

  @Post()
  async create(@Body(new ZodPipe(CreateAccommodationSchema)) body: CreateAccomodationDto, @Request() req: RequestWithUser) {
    body.userId = req.user.sub;
    return await this.accommodationsService.create(body);
  }

  @Public()
  @Get(':id')
  async findById(
    @Param(new ZodPipe(IdParamUuidSchema)) params: IdParamUuidDto
  ) {
    return await this.accommodationsService.getById(params.id);
  }

  @Public()
  @Get()
  async find(
    @Query(new ZodPipe(ReadAccommodationSchema)) query: ReadAccommodationDto
  ) {
    return await this.accommodationsService.findAll(query);
  }

  @Put(':id')
  async update(
    @Param(new ZodPipe(IdParamUuidSchema)) params: IdParamUuidDto,
    @Body(new ZodPipe(UpdateAccommodationSchema)) body: UpdateAccommodationDto,
    @Request() req: RequestWithUser
  ) {
    return await this.accommodationsService.update(params.id, req.user.sub, body);
  }

  @Delete(':id')
  async delete(@Param(new ZodPipe(IdParamUuidSchema)) params: IdParamUuidDto, @Request() req: RequestWithUser) {
    await this.accommodationsService.delete(params.id, req.user.sub);
  }
}
