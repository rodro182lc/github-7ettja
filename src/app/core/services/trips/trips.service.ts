import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EnvService } from '../env.service';
import { forkJoin, Observable, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { ApiResponse } from '@shared/models/api-response.model';
import { NewTrip } from '@shared/models/trips/new-trip.model';
import { Trip } from '@shared/models/trips/trip.model';
import { TripSearchCriteria } from '@shared/models/trips/trip-search-criteria.model';
import {
  TripLoadCriteriaDto,
  TripQueryCriteriaDto,
  TripSearchCriteriaDto
} from '@shared/dtos/trips/trip-load-criteria.dto';
import { TripQueryField } from 'app/trips/enumerations/trip-query-field.enum';
import { ResponseStatus } from '@shared/enumerations/core/response-status.enum';
import { TripProperties } from '@shared/models/trips/trip-properties.model';
import { CreateTripDto } from '@shared/dtos/trips/create-trip.dto';
import { CreateAcquireEventDto } from '@shared/dtos/trips/create-acquire-event.dto';
import { CreateHookEventDto } from '@shared/dtos/trips/create-hook-event.dto';
import { EventUpsert } from '@shared/models/trips/event-upsert.model';
import { CreateProbillEventDto } from '@shared/dtos/trips/create-probill-event.dto';
import { TripDto } from '@shared/dtos/trips/trip.dto';
import { TripToClose } from '@shared/models/trips/trip-to-close.model';
import { BackhaulRequest } from '@shared/models/trips/backhaul-request.model';
import { BackhaulRequestDto } from '@shared/dtos/trips/backhaul-request.dto';
import { DriverAvailability } from '@shared/models/trips/driver-availability.model';
import { DriverAvailabilityDto } from '@shared/dtos/trips/driver-availability.dto';
import { TripUpdateProperties } from '@shared/models/trips/trip-update-properties.model';
import { TripAuxiliaryValueDto } from '@shared/dtos/trips/trip-auxiliary-value.dto';
import { TripAuxiliaryValue } from '@shared/models/trips/trip-auxiliary-value.model';
import { DateTimeHelper } from '@shared/helpers/date-time.helper';
import { TripQuery } from '@shared/models/trips/trip-query.model';
//import { TripNotesService } from './trip-notes.service';
import { TripToCloseDto } from '@shared/dtos/trips/trip-to-close.dto';
import { TripIconsService } from './trip-icons.service';
import { TripEvent } from '@shared/models/trips/trip-event.model';
import { TripEventDto } from '@shared/dtos/trips/trip-event.dto';
import { tripData } from '../../../../../mocks/data/trip/tripsDemo';

@Injectable({
  providedIn: 'root'
})
export class TripsService {
  constructor(
    private environment: EnvService,
    private http: HttpClient,
    //private catalog: CatalogService,
    //private tripNotes: TripNotesService,
    private tripIcons: TripIconsService
  ) {}

  /**
   * Get the details of a single trip as a dto (result as exaclty gotten from API)
   * @param tripId - The id of the trip to fetch
   */
  getTripDto(tripId: string): Observable<TripDto | null> {
    return this.http
      .get<ApiResponse<TripDto>>(
        `${this.environment.apiUrl}/trip/api/v1/Trips/${tripId}`
      )
      .pipe(
        map((response: ApiResponse<TripDto>) => {
          if (response?.status === ResponseStatus.Success && response?.result) {
            return response?.result;
          }
          return null;
        })
      );
  }

  /**
   * Get the details of a single trip
   * @param tripId - The id of the trip to fetch
   */
  /*
  getTrip(tripId: string): Observable<Trip> {
    // Getting the trip model
    const getTripModel = this.getTripDto(tripId).pipe(
      map((response) => {
        const modelResult: Trip = automapper.map(
          'TripDto',
          'TripModel',
          response
        );
        return modelResult;
      })
    );

    // Calling both single trip and trip auxiliaries endpoints and merging their responses
    return forkJoin({
      tripModel: getTripModel,
      auxValues: this.getTripsAuxiliaryValues({
        tripId
      })
    }).pipe(
      map((response) => {
        if (response?.tripModel) {
          this.setTripAdditionalFields(response.tripModel, response.auxValues);
        }
        return response?.tripModel;
      })
    );
  }
*/
  /**
   * Getting the trip query preferences and converting them into the object that's needed by the getTrips API
   */
  private getTripQueryCriteria(tripQuery: TripQuery): TripQueryCriteriaDto[] {
    const queryCriteriaDto: TripQueryCriteriaDto[] = [];
    queryCriteriaDto.push({
      criteria: TripQueryField.DriverCategory,
      ids: tripQuery.driverCategory
    });
    queryCriteriaDto.push({
      criteria: TripQueryField.Role,
      ids: tripQuery.tripRole
    });
    queryCriteriaDto.push({
      criteria: TripQueryField.Status,
      ids: tripQuery.tripStatus
    });
    queryCriteriaDto.push({
      criteria: TripQueryField.Terminal,
      ids: tripQuery.terminal
    });
    queryCriteriaDto.push({
      criteria: TripQueryField.TripCategory,
      ids: tripQuery.tripCategory
    });
    queryCriteriaDto.push({
      criteria: TripQueryField.TruckCategory,
      ids: tripQuery.truckCategory
    });
    return queryCriteriaDto;
  }

  /**
   * Calls the dashboard search endpoint to get all trips that match passed-in criteria
   * @param criteriaDto - Object that will be passed as input argument to the dashboard search endpoint
   */
  private searchTripDashboard(
    criteriaDto: TripLoadCriteriaDto
  ): Observable<Trip[]> {
    return this.http
      .post<ApiResponse<TripDto>>(
        `${this.environment.apiUrl}/trip/api/v1/Trips/dashboard/search`,
        criteriaDto
      )
      .pipe(
        map((response: ApiResponse<TripDto>) => {
          // Converting trip dtos into our model objects
          let modelResult: Trip[] = [];
          if (response?.status === ResponseStatus.Success && response?.result) {
            modelResult = automapper.map(
              'TripDto',
              'TripModel',
              response.result
            );
          }

          // Default/initial sort by Trip Number descending
          // Not relying on Ignite's grid initial sort since we need to stack new trips on top
          modelResult.sort((a, b) => {
            const aLessB = a.externalId < b.externalId;
            const aMoreB = a.externalId > b.externalId;
            return aLessB ? 1 : aMoreB ? -1 : 0;
          });

          return modelResult;
        })
      );
  }

  /**
   * Populates the given trip's fields with all necessary information by running business logic
   * @param trip - Trip to be modified
   */
  private setTripAdditionalFields(
    trip: Trip,
    allAuxValues: TripAuxiliaryValue[]
  ): void {
    // Setting auxiliary values that are related to the given trip
    const tripAuxValues = allAuxValues?.filter((v) => v.tripId === trip.tripId);
    trip.pendingActions = tripAuxValues;

    // Populates trip's icons values
    this.tripIcons.setIcons(trip);

    // Setting rest of trip's fields
    if (trip.icons.appointment.missingAppointment) {
      trip.tripWithIcons += '📞';
    }
    if (trip.icons.appointment.confirmedAppointment) {
      trip.tripWithIcons += '🚪';
    }
  }

  /**
   * Get the trips
   * @returns Array of trips
   */
  getTrips(
    searchCriteria: TripSearchCriteria,
    tripQuery: TripQuery
  ): Observable<Trip[]> {
    let cont = 0;
    for (let trip of tripData) {
      trip.driver = ` ${'Driver ' + cont}`;
      trip.dispatcher = ` ${'Dispatcher ' + cont}`;
      cont++;
    }
    return of(tripData);
  }

  /**
   *
   * @param dataToSave new trip data to be saved to Data base
   * @returns api Response
   */
  postNewTrip(dataToSave: NewTrip): Observable<ApiResponse<string>> {
    const createTripDto: CreateTripDto = automapper.map(
      'NewTripModel',
      'CreateTripDto',
      dataToSave
    );

    return this.http.post<ApiResponse<string>>(
      `${this.environment.apiUrl}/trip/api/v1/Trips`,
      createTripDto
    );
  }

  /**
   *
   * @param dataToSave new trip data to be saved to Data base
   * @returns api Response
   */
  postAcquireEvent(dataToSave: NewTrip): Observable<ApiResponse> {
    const createAcquireEventDto: CreateAcquireEventDto = automapper.map(
      'NewTripModel',
      'CreateAcquireEventDto',
      dataToSave
    );

    return this.http.post<ApiResponse>(
      `${this.environment.apiUrl}/trip/api/v1/Trips/${createAcquireEventDto.tripId}/TripEvents/add`,
      createAcquireEventDto
    );
  }

  /**
   *
   * @param dataToSave new trip data to be saved to Data base
   * @returns api Response
   */
  postHookEvent(dataToSave: NewTrip): Observable<ApiResponse> {
    const createHookEventDto: CreateHookEventDto = automapper.map(
      'NewTripModel',
      'CreateHookEventDto',
      dataToSave
    );

    return this.http.post<ApiResponse>(
      `${this.environment.apiUrl}/trip/api/v1/Trips/${createHookEventDto.tripId}/TripEvents/add`,
      createHookEventDto
    );
  }

  /**
   *
   * @param dataToSave new trip data to be saved to Data base
   * @returns api Response
   */
  postProbillEvent(eventUpsert: EventUpsert): Observable<ApiResponse> {
    const createProbillEventDto: CreateProbillEventDto = automapper.map(
      'EventUpsertModel',
      'CreateProbillEventDto',
      eventUpsert
    );
    return this.http.post<ApiResponse>(
      `${this.environment.apiUrl}/trip/api/v1/Trips/${createProbillEventDto.tripId}/TripEvents/add`,
      createProbillEventDto
    );
  }

  /**
   * Completes the trip that matches the given id
   * @param tripId - The id of the trip to be closed
   */
  closeTrip(tripToClose: TripToClose): Observable<ApiResponse> {
    const tripToCloseDto: TripToCloseDto = automapper.map(
      'TripToClose',
      'TripToCloseDto',
      tripToClose
    );
    return this.http.post<ApiResponse>(
      `${this.environment.apiUrl}/trip/api/v1/Trips/CloseTrip`,
      tripToCloseDto
    );
  }

  /**
   * Retrieves the Trip Properties values from the DB
   * @returns - Latest Trip Properties values from API
   */
  getTripProperties(tripId: string): Observable<TripProperties> {
    return this.http
      .get<ApiResponse<TripDto>>(
        `${this.environment.apiUrl}/trip/api/v1/Trips/${tripId}`
      )
      .pipe(
        map((response) => {
          if (response?.status !== ResponseStatus.Success) {
            const emptyTripProperties: TripProperties = {
              tripId: null,
              tripNo: null,
              leadDriver: null,
              teamDriver: null,
              terminal: null,
              dispatcher: null,
              tripCategory: null,
              tripRole: null,
              dateOut: null,
              dateIn: null,
              createdOn: null,
              markClose: null,
              modifiedBy: null,
              modifiedOn: null,
              isCompleted: null
            };
            return emptyTripProperties;
          }

          const model: TripProperties = automapper.map(
            'TripDto',
            'TripPropertiesModel',
            response?.result
          );
          return model;
        })
      );
  }

  /**
   * Retrieves the Driver Availability values from the DB
   * @returns - Latest Driver Availability values from API
   */
  getTripDriverAvailability(tripId: string): Observable<DriverAvailability> {
    return this.http
      .get<ApiResponse<DriverAvailabilityDto>>(
        `${this.environment.apiUrl}/trip/api/v1/DriverAvailability?tripId=${tripId}`
      )
      .pipe(
        map((response) => {
          if (response?.status !== ResponseStatus.Success) {
            const emptyTripDriverAvailability: DriverAvailability = {
              tripId: null,
              name: null,
              driverCode: null,
              availability: null,
              notes: null,
              isAcknowledge: false,
              approvedBy: null,
              approvedOn: null
            };
            return emptyTripDriverAvailability;
          }

          const model: DriverAvailability = automapper.map(
            'DriverAvailabilityDto',
            'DriverAvailabilityModel',
            response?.result
          );
          return model;
        })
      );
  }
  /**
   *
   * @param DriverAvailability Latest TripDriverAvailability values from UI
   * @returns - Response of the BE
   */
  acknowledgeDriverAvailability(
    tripId: string,
    driverAvailability: DriverAvailability
  ): Observable<ApiResponse> {
    const driverAvailabilityDto: DriverAvailabilityDto = automapper.map(
      'DriverAvailabilityModel',
      'DriverAvailabilityDto',
      driverAvailability
    );

    return this.http.put<ApiResponse>(
      `${this.environment.apiUrl}/trip/api/v1/Trips/${tripId}/driverAvailability`,
      driverAvailabilityDto
    );
  }

  /**
   *
   * @param dataToSave Latest Trip Properties values from UI
   * @returns - Response of the BE
   */

  /**
   * Get the Backhaul request status and info for selected Trip
   * @param tripId - The id of the trip to fetch the request status for
   */
  getTripBackhaulRequestStatus(tripId: string): Observable<BackhaulRequest> {
    return this.http
      .get<ApiResponse<BackhaulRequestDto>>(
        `${this.environment.apiUrl}/trip/api/v1/Trips/backhaulRequest/${tripId}`
      )
      .pipe(
        map((response: ApiResponse<BackhaulRequestDto>) => {
          // Converting Backhaul Request dto into our model
          const modelResult: BackhaulRequest =
            response?.status === ResponseStatus.Success
              ? automapper.map(
                  'BackhaulRequestDto',
                  'BackhaulRequestModel',
                  response?.result
                )
              : null;
          return modelResult;
        })
      );
  }

  approveBackhaulRequest(
    tripId: string,
    backhaulRequest: BackhaulRequest
  ): Observable<ApiResponse> {
    const backhaulRequestDto: BackhaulRequestDto = automapper.map(
      'BackhaulRequestModel',
      'BackhaulRequestDto',
      backhaulRequest
    );
    return this.http.put<ApiResponse>(
      `${this.environment.apiUrl}/trip/api/v1/Trips/${tripId}/backhaulrequest/approve`,
      backhaulRequestDto
    );
  }

  /**
   * Deletes the trip that matches the given id
   * @param tripId - The id of the trip to be deleted
   */
  deleteTrip(tripId: string): Observable<ApiResponse> {
    return this.http.delete<ApiResponse>(
      `${this.environment.apiUrl}/trip/api/v1/Trips/${tripId}/ForceDelete`
    );
  }
  /**
   * Gets the events that would be deleted if a certain trip is deleted
   * @param tripId - The id of the trip to be deleted
   */
  getTripEventsAboutToDelete(tripId: string): Observable<TripEvent[]> {
    return this.http
      .get<ApiResponse<TripEventDto[]>>(
        `${this.environment.apiUrl}/trip/api/v1/Trips/${tripId}/DeleteOptions`
      )
      .pipe(
        map((response: ApiResponse<TripEventDto[]>) => {
          if (response?.status === ResponseStatus.Success && response?.result) {
            const model: TripEvent[] = automapper.map(
              'TripEventDto',
              'TripEventModel',
              response.result
            );
            return model;
          }
          return [];
        })
      );
  }
}
