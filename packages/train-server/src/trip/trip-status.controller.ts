import { Controller, Get, Param } from '@nestjs/common';
import { TripStatusService } from './trip-status.service';

@Controller()
export class TripStatusController {
  constructor(
    private readonly _tripStatusService: TripStatusService
    ) { }

  @Get('/trip-status-by-device/:mac')
  async getCurrenTripStatusByDevice(@Param('mac') mac: string) {
    const status = await this._tripStatusService.getTripStatus(mac);
    return Promise.resolve(status);
  }

  @Get('/trip-status')
  public getAllTripStatus() {
    const tripStatusResults = Array.from(this._tripStatusService.tripStatusById.values());
    return Promise.resolve(tripStatusResults);
  }

  @Get('/trip-status/:id')
  public getCurrenTripStatusById(@Param('id') id: string) {
    const status = this._tripStatusService.tripStatusById.get(id);
    return Promise.resolve(status);
  }

}
