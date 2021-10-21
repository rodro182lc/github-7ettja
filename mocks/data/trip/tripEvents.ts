import { TripEvent } from '@shared/models/trips/trip-event.model';

export const tripEventData: any[] = [
  {
    eventNumber: 'e72737c0-3e82-4d9e-35e7-08d94d37fc01',
    startTime: new Date('2021-10-16T17:23:00.000Z'),
    endTime: new Date('2021-10-16T17:34:00.000Z'),
    eventName: 'ACQUIRE',
    probillNo: '',
    probillId: '',
    isPowerUnit: true,
    equipmentId: 'e72737c0-3e82-4d9e-35e7-08d94d37fc01',
    equipmentUnit: '19498-21RP',
    equipmentStatus: 0,
    equipmentStatusDesc: '',
    location: ' BRAMPTON TERMINAL - BRAMPTON 25 PRODUCTION ROAD',
    locationId: '8f717def-c1ed-4971-9a22-d8d39b4eaea7',
    city: 'BRAMPTON',
    code: 'ON',
    cityWithState: 'BRAMPTON, ON',
    etaDate: new Date('2021-10-16T17:23:00.000Z'),
    longitude: -79.669077,
    latitude: 43.7153411,
    orderId: '',
    status: 'COMPLETED',
    sequence: 1,
    scheduledDateTime: new Date('2021-10-16T17:23:00.000Z'),
    locationTimeMsDif: 3599750,
    /*eventType: {
      name: 'ACQUIRE',
      description: 'ACQUIRE',
      id: '26bcd7a0-41e3-4afc-a50e-c73ae34fb275',
      createdOn: '0001-01-01T00:00:00+00:00',
      modifiedOn: new Date('2021-08-04T17:26:55.2761104-04:00',
      isRowDeleted: false
    },*/
    //tripId: '1a66e1f6-d259-414d-aa0f-08d990060183',
    //contractId: 0,
    //sequenceId: 1,
    truck: {
      truckId: 'e72737c0-3e82-4d9e-35e7-08d94d37fc01',
      truckNo: '19498-21RP',
      powerUnit: 1,
      driverId: '',
      isPowerUnit: '',
      location: {
        locationId: '',
        locationName: '',
        longitude: 0,
        latitude: 0,
        name: '',
        address: '',
        city: ''
      },
      status: '',
      unitNo: '',
      vin: '',
      make: '',
      model: '',
      plateNo: '',
      year: '',
      terminal: '',
      class: '',
      division: '',

      vehicleType: '',
      owner: '',
      role: '',
      truckCategory: '',
      satelliteProvider: ''
      //truckCategoryId: '0413c07c-4ca6-44dc-e7d2-08d9099dec04',
      //truckStatusId: '00746c88-9dca-44c0-b3e2-08d906756b4e'
    },
    localEtaDate: new Date('2021-10-16T12:23:00'),
    currentLocationDate: new Date('2021-10-20T15:31:36.584769'),
    localStartTime: new Date('2021-10-16T12:23:00'),
    localFinishTime: new Date('2021-10-16T12:34:00'),
    finishTime: new Date('2021-10-16T16:34:00+00:00'),
    eventLogStatus: {
      name: 'COMPLETED',
      id: 'af916d82-e416-4be9-87b4-e00d9fb62612',
      createdOn: '0001-01-01T00:00:00+00:00',
      isRowDeleted: false
    },
    id: 'c85dfbfd-d60c-48e8-d58e-08d99004f27a',
    createdOn: new Date('2021-10-16T18:53:11.9428119+00:00'),
    createdBy: 'Sunaina@chargerlogistics.com',
    modifiedOn: new Date('2021-10-16T18:54:25.1770414+00:00'),
    modifiedBy: 'Sunaina@chargerlogistics.com',
    isRowDeleted: false,
    trip: {
      tripId: '1a66e1f6-d259-414d-aa0f-08d990060183',
      externalId: 735599,
      trip: 'T735599',
      tripWithIcons: 'T735599',
      drvCode: 'NIRBHAI',
      driver: 'NIRBHAI SINGH',
      leadDriverId: '1cc8e255-f650-4bef-4a9c-08d94d37fc33',
      teamDriverId: '',
      truck: '19498-21RP',
      trailer1: 'XPRESS-X0706',
      lastDate: new Date('2021-10-16T21:45:00.000Z'),
      nextDate: new Date(),
      startTime: new Date('2021-10-16T19:51:00.000Z'),
      finishTime: new Date(),
      truckLocation: '',
      trailerLocation: '',
      nextEventETA: new Date(),
      nextEventStart: null,
      hos: 0,
      lastEventName: 'DROP',
      nextEventName: '',
      lastLocation: ' BRAMPTON TERMINAL - BRAMPTON 25 PRODUCTION ROAD',
      nextLocation: ' ',
      nextCity: '',
      nextState: '',
      lastCity: 'BRAMPTON',
      category: 'REGULAR',
      dispatcher: 'Sunaina',
      modifiedBy: 'Sunaina',
      status: 'Dispatched',
      nextEventSeqId: 0,
      lastEventSeqId: 5,
      lastEventFinish: new Date('2021-10-16T22:45:00.000Z'),
      lastEventStart: new Date('2021-10-16T21:45:00.000Z'),
      lastEventETA: new Date('2021-10-16T21:45:00.000Z'),
      pendingActions: [],
      icons: {
        isBrandNewTrip: false,
        appointment: { missingAppointment: false, confirmedAppointment: false },
        ace: { danger: true, warning: false, success: false },
        aci: { danger: false, warning: false, success: false },
        fuelWarning: false,
        nextEvent: {
          cross: true,
          redExclamation: false,
          dangerUnableCalc: true,
          danger: false,
          warning: false,
          success: false
        },
        finalEvent: {
          cross: true,
          redExclamation: false,
          dangerUnableCalc: false,
          danger: false,
          warning: false,
          success: true
        }
      },
      isExpanded: true,
      events: []
    },
    icons: { confirmedAppointment: false, missingAppointment: false }
  },
  {
    eventNumber: '648eeb82-4898-4d9f-43a8-08d94d1f24ab',
    startTime: new Date('2021-10-16T18:34:00.000Z'),
    endTime: new Date('2021-10-16T18:37:00.000Z'),
    eventName: 'HOOK',
    probillNo: '',
    probillId: '',
    isPowerUnit: true,
    equipmentId: '648eeb82-4898-4d9f-43a8-08d94d1f24ab',
    equipmentUnit: 'XPRESS-X0706',
    equipmentStatus: 1,
    equipmentStatusDesc: 'Loaded',
    location: ' LAREDO EVOLUTION TERMINAL MAIN 13620 EVOLUTION LOOP',
    locationId: '05311ed9-633c-48ea-9136-4992d3b376f4',
    city: 'LAREDO',
    code: 'TX',
    cityWithState: 'LAREDO, TX',
    etaDate: new Date('2021-10-16T18:34:00.000Z'),
    longitude: -99.4839121,
    latitude: 27.6839319,
    orderId: '',
    status: 'COMPLETED',
    sequence: 2,
    scheduledDateTime: new Date('2021-10-16T18:34:00.000Z'),
    locationTimeMsDif: -250,
    eventType: {
      name: 'HOOK',
      description: 'HOOK',
      id: '4857719c-028c-420c-a951-94d32ab7180e',
      createdOn: '0001-01-01T00:00:00+00:00',
      modifiedOn: new Date('2021-07-30T18:09:41.2401634+00:00'),
      modifiedBy: 'Sujjan@chargerlogistics.com',
      isRowDeleted: false
    },
    tripId: '1a66e1f6-d259-414d-aa0f-08d990060183',
    contractId: 0,
    sequenceId: 2,
    truck: {
      truckId: 'e72737c0-3e82-4d9e-35e7-08d94d37fc01',
      truckNo: '312',
      unitNo: '19498-21RP',
      powerUnit: 1,
      driverId: '',
      isPowerUnit: '',
      location: {
        locationId: '',
        locationName: '',
        longitude: 0,
        latitude: 0,
        name: '',
        address: '',
        city: ''
      },
      status: '',
      vin: '',
      make: '',
      model: '',
      plateNo: '',
      year: '',
      terminal: '',
      class: '',
      division: '',

      vehicleType: '',
      owner: '',
      role: '',
      truckCategory: '',
      satelliteProvider: ''
    },
    trailer: {
      trailerId: '648eeb82-4898-4d9f-43a8-08d94d1f24ab',
      unitNo: 'XPRESS-X0706',
      trailerNo: '',
      location: {
        locationId: '',
        locationName: '',
        longitude: 0,
        latitude: 0,
        name: '',
        address: '',
        city: ''
      },
      status: '',
      vin: '',
      make: '',
      model: '',
      year: '',
      terminal: '',
      class: '',
      division: '',
      plateNo: '',
      vehicleType: '',
      trailerCategory: '',
      trailerNoWithLoadState: '',
      loadState: ''
    },
    localEtaDate: new Date('2021-10-16T13:34:00'),
    currentLocationDate: new Date('2021-10-20T14:31:36.5847773'),
    etAdate: new Date('2021-10-16T18:34:00+00:00'),
    localStartTime: new Date('2021-10-16T13:34:00'),
    localFinishTime: new Date('2021-10-16T13:37:00'),
    finishTime: new Date('2021-10-16T18:37:00+00:00'),
    eventLogStatus: {
      name: 'COMPLETED',
      id: 'af916d82-e416-4be9-87b4-e00d9fb62612',
      createdOn: '0001-01-01T00:00:00+00:00',
      isRowDeleted: false
    },
    id: '4a1cb3a3-471f-4a52-d598-08d99004f27a',
    createdOn: new Date('2021-10-16T19:30:26.1998484+00:00'),
    createdBy: 'Sunaina@chargerlogistics.com',
    modifiedOn: new Date('2021-10-16T19:34:28.7071692+00:00'),
    modifiedBy: 'Sunaina@chargerlogistics.com',
    isRowDeleted: false,
    trip: {
      tripId: '1a66e1f6-d259-414d-aa0f-08d990060183',
      externalId: 735599,
      trip: 'T735599',
      tripWithIcons: 'T735599',
      drvCode: 'NIRBHAI',
      driver: 'NIRBHAI SINGH',
      leadDriverId: '1cc8e255-f650-4bef-4a9c-08d94d37fc33',
      teamDriverId: '',
      truck: '19498-21RP',
      trailer1: 'XPRESS-X0706',
      lastDate: new Date('2021-10-16T21:45:00.000Z'),
      nextDate: new Date(),
      startTime: new Date('2021-10-16T19:51:00.000Z'),
      finishTime: new Date(),
      truckLocation: '',
      trailerLocation: '',
      nextEventETA: new Date(),
      nextEventStart: null,
      hos: 0,
      lastEventName: 'DROP',
      nextEventName: '',
      lastLocation: ' BRAMPTON TERMINAL - BRAMPTON 25 PRODUCTION ROAD',
      nextLocation: ' ',
      nextCity: '',
      nextState: '',
      lastCity: 'BRAMPTON',
      category: 'REGULAR',
      dispatcher: 'Sunaina',
      modifiedBy: 'Sunaina',
      status: 'Dispatched',
      nextEventSeqId: 0,
      lastEventSeqId: 5,
      lastEventFinish: new Date('2021-10-16T22:45:00.000Z'),
      lastEventStart: new Date('2021-10-16T21:45:00.000Z'),
      lastEventETA: new Date('2021-10-16T21:45:00.000Z'),
      pendingActions: [],
      icons: {
        isBrandNewTrip: false,
        appointment: { missingAppointment: false, confirmedAppointment: false },
        ace: { danger: true, warning: false, success: false },
        aci: { danger: false, warning: false, success: false },
        fuelWarning: false,
        nextEvent: {
          cross: true,
          redExclamation: false,
          dangerUnableCalc: true,
          danger: false,
          warning: false,
          success: false
        },
        finalEvent: {
          cross: true,
          redExclamation: false,
          dangerUnableCalc: false,
          danger: false,
          warning: false,
          success: true
        }
      },
      isExpanded: true,
      events: []
    },
    icons: { confirmedAppointment: false, missingAppointment: false }
  },
  {
    eventNumber: '8ea5c84a-4848-4f34-6857-08d93ca220d9',
    startTime: new Date('2021-10-16T19:45:00.000Z'),
    endTime: new Date('2021-10-16T20:45:00.000Z'),
    eventName: 'PICKUP',
    probillNo: 1904346,
    probillId: '8ea5c84a-4848-4f34-6857-08d93ca220d9',
    isPowerUnit: true,
    equipmentId: '648eeb82-4898-4d9f-43a8-08d94d1f24ab',
    equipmentUnit: 'XPRESS-X0706',
    equipmentStatus: 1,
    equipmentStatusDesc: 'Loaded',
    location: 'KEURIG GREEN MOUNTAIN-PC1009 25400 OLD MILL ROAD',
    locationId: '7b5e9b2f-10cd-4972-a581-6cf0ac7fecf0',
    city: 'WINDSOR',
    code: '',
    cityWithState: 'WINDSOR',
    etaDate: new Date('2021-10-16T19:45:00.000Z'),
    longitude: -76.707734,
    latitude: 36.788778,
    orderId: '6d43cb0f-a3c7-4c70-f0a9-08d93ca21ed7',
    status: 'COMPLETED',
    sequence: 3,
    scheduledDateTime: new Date('2021-10-16T19:45:00.000Z'),
    locationTimeMsDif: 3599750,
    eventType: {
      name: 'PICKUP',
      description: 'PICKUP',
      id: '2fda5847-b3e0-4986-bb6c-514d1d19acc7',
      createdOn: '0001-01-01T00:00:00+00:00',
      isRowDeleted: false
    },
    tripId: '1a66e1f6-d259-414d-aa0f-08d990060183',
    contractId: 0,
    sequenceId: 3,
    truck: {
      truckId: 'e72737c0-3e82-4d9e-35e7-08d94d37fc01',
      unitNo: '19498-21RP',
      powerUnit: 1
    },
    trailer: {
      trailerId: '648eeb82-4898-4d9f-43a8-08d94d1f24ab',
      unitNo: 'XPRESS-X0706',
      trailerStatusId: 'c7cc88bd-7a9d-4151-006c-08d90c19afdc'
    },
    probill: {
      id: '8ea5c84a-4848-4f34-6857-08d93ca220d9',
      externalId: 1904346,
      pickupNumber: '',
      deliveryNumber: '',
      orderId: '6d43cb0f-a3c7-4c70-f0a9-08d93ca21ed7'
    },
    localEtaDate: new Date('2021-10-16T14:45:00'),
    currentLocationDate: new Date('2021-10-20T15:31:36.5847859'),
    etAdate: new Date('2021-10-16T18:45:00+00:00'),
    localStartTime: new Date('2021-10-16T14:45:00'),
    localFinishTime: new Date('2021-10-16T15:45:00'),
    finishTime: new Date('2021-10-16T19:45:00+00:00'),
    eventLogStatus: {
      name: 'COMPLETED',
      id: 'af916d82-e416-4be9-87b4-e00d9fb62612',
      createdOn: '0001-01-01T00:00:00+00:00',
      isRowDeleted: false
    },
    id: '27b66de1-9692-45a5-d599-08d99004f27a',
    createdOn: new Date('2021-10-16T19:30:50.4816608+00:00'),
    createdBy: 'Sunaina@chargerlogistics.com',
    modifiedOn: new Date('2021-10-16T21:45:36.3062197+00:00'),
    modifiedBy: 'Sunaina@chargerlogistics.com',
    isRowDeleted: false,
    trip: {
      tripId: '1a66e1f6-d259-414d-aa0f-08d990060183',
      externalId: 735599,
      trip: 'T735599',
      tripWithIcons: 'T735599',
      drvCode: 'NIRBHAI',
      driver: 'NIRBHAI SINGH',
      leadDriverId: '1cc8e255-f650-4bef-4a9c-08d94d37fc33',
      teamDriverId: '',
      truck: '19498-21RP',
      trailer1: 'XPRESS-X0706',
      lastDate: new Date('2021-10-16T21:45:00.000Z'),
      nextDate: new Date(),
      startTime: new Date('2021-10-16T19:51:00.000Z'),
      finishTime: new Date(),
      truckLocation: '',
      trailerLocation: '',
      nextEventETA: new Date(),
      nextEventStart: null,
      hos: 0,
      lastEventName: 'DROP',
      nextEventName: '',
      lastLocation: ' BRAMPTON TERMINAL - BRAMPTON 25 PRODUCTION ROAD',
      nextLocation: ' ',
      nextCity: '',
      nextState: '',
      lastCity: 'BRAMPTON',
      category: 'REGULAR',
      dispatcher: 'Sunaina',
      modifiedBy: 'Sunaina',
      status: 'Dispatched',
      nextEventSeqId: 0,
      lastEventSeqId: 5,
      lastEventFinish: new Date('2021-10-16T22:45:00.000Z'),
      lastEventStart: new Date('2021-10-16T21:45:00.000Z'),
      lastEventETA: new Date('2021-10-16T21:45:00.000Z'),
      pendingActions: [
        {
          tripId: '1a66e1f6-d259-414d-aa0f-08d990060183',
          value: 'NOT SUBMITTED',
          createdOn: new Date('2021-10-16T19:02:17.3717301+00:00'),
          createdBy: 'Sunaina@chargerlogistics.com',
          modifiedOn: new Date('2021-10-16T19:03:58.9658404+00:00'),
          modifiedBy: 'Sunaina@chargerlogistics.com',
          auxItem: 'ACE Status'
        },
        {
          tripId: '1a66e1f6-d259-414d-aa0f-08d990060183',
          value: 'Missing',
          createdOn: new Date('2021-10-18T16:44:31.180935+00:00'),
          createdBy: 'Syed@chargerlogistics.com',
          modifiedOn: new Date('2021-10-18T16:44:40.5856282+00:00'),
          modifiedBy: 'Syed@chargerlogistics.com',
          auxItem: 'Probill Pickup Info'
        }
      ],
      icons: {
        isBrandNewTrip: false,
        appointment: { missingAppointment: false, confirmedAppointment: false },
        ace: { danger: true, warning: false, success: false },
        aci: { danger: false, warning: false, success: false },
        fuelWarning: false,
        nextEvent: {
          cross: true,
          redExclamation: false,
          dangerUnableCalc: true,
          danger: false,
          warning: false,
          success: false
        },
        finalEvent: {
          cross: true,
          redExclamation: false,
          dangerUnableCalc: false,
          danger: false,
          warning: false,
          success: true
        }
      },
      isExpanded: true
    },
    icons: { confirmedAppointment: false, missingAppointment: true }
  },
  {
    eventNumber: '8cccb1b0-a431-49ae-6864-08d93ca220d9',
    startTime: new Date('2021-10-16T17:44:00.000Z'),
    endTime: new Date('2021-10-16T17:49:00.000Z'),
    eventName: 'PICKUP',
    probillNo: 1904331,
    probillId: '8cccb1b0-a431-49ae-6864-08d93ca220d9',
    isPowerUnit: true,
    equipmentId: '648eeb82-4898-4d9f-43a8-08d94d1f24ab',
    equipmentUnit: 'XPRESS-X0706',
    equipmentStatus: 1,
    equipmentStatusDesc: 'Loaded',
    location: 'Coveris/Transcontinental Packaging 201 SOUTH BLAIR STREET',
    locationId: 'ab5c83a3-7591-4c9a-a35e-35bbd5bde6c3',
    city: 'WHITBY',
    code: '',
    cityWithState: 'WHITBY',
    etaDate: new Date('2021-10-16T17:44:00.000Z'),
    longitude: -78.919954,
    latitude: 43.858719,
    orderId: '07177eaf-54df-4c90-f0b3-08d93ca21ed7',
    status: 'COMPLETED',
    sequence: 4,
    scheduledDateTime: new Date('2021-10-16T17:44:00.000Z'),
    locationTimeMsDif: 3599750,
    eventType: {
      name: 'PICKUP',
      description: 'PICKUP',
      id: '2fda5847-b3e0-4986-bb6c-514d1d19acc7',
      createdOn: '0001-01-01T00:00:00+00:00',
      isRowDeleted: false
    },
    tripId: '1a66e1f6-d259-414d-aa0f-08d990060183',
    contractId: 0,
    sequenceId: 4,
    truck: {
      id: 'e72737c0-3e82-4d9e-35e7-08d94d37fc01',
      unitNo: '19498-21RP',
      powerUnit: 1,
      truckCategoryId: '0413c07c-4ca6-44dc-e7d2-08d9099dec04',
      truckStatusId: '00746c88-9dca-44c0-b3e2-08d906756b4e'
    },
    trailer: {
      id: '648eeb82-4898-4d9f-43a8-08d94d1f24ab',
      unitNo: 'XPRESS-X0706',
      trailerStatusId: 'c7cc88bd-7a9d-4151-006c-08d90c19afdc'
    },
    probill: {
      id: '8cccb1b0-a431-49ae-6864-08d93ca220d9',
      externalId: 1904331,
      pickupNumber: '',
      deliveryNumber: '',
      orderId: '07177eaf-54df-4c90-f0b3-08d93ca21ed7'
    },
    localEtaDate: new Date('2021-10-16T12:44:00'),
    currentLocationDate: new Date('2021-10-20T15:31:36.5847877'),
    etAdate: new Date('2021-10-16T16:44:00+00:00'),
    localStartTime: new Date('2021-10-16T12:44:00'),
    localFinishTime: new Date('2021-10-16T12:49:00'),
    finishTime: new Date('2021-10-16T16:49:00+00:00'),
    eventLogStatus: {
      name: 'COMPLETED',
      id: 'af916d82-e416-4be9-87b4-e00d9fb62612',
      createdOn: '0001-01-01T00:00:00+00:00',
      isRowDeleted: false
    },
    id: '545b37df-a61e-4638-224c-08d9925334e3',
    createdOn: new Date('2021-10-18T16:44:30.6752335+00:00'),
    createdBy: 'Syed@chargerlogistics.com',
    modifiedOn: new Date('2021-10-18T16:44:40.5613665+00:00'),
    modifiedBy: 'Syed@chargerlogistics.com',
    isRowDeleted: false,
    trip: {
      tripId: '1a66e1f6-d259-414d-aa0f-08d990060183',
      externalId: 735599,
      trip: 'T735599',
      tripWithIcons: 'T735599',
      drvCode: 'NIRBHAI',
      driver: 'NIRBHAI SINGH',
      leadDriverId: '1cc8e255-f650-4bef-4a9c-08d94d37fc33',
      teamDriverId: '',
      truck: '19498-21RP',
      trailer1: 'XPRESS-X0706',
      lastDate: new Date('2021-10-16T21:45:00.000Z'),
      nextDate: new Date(),
      startTime: new Date('2021-10-16T19:51:00.000Z'),
      finishTime: new Date(),
      truckLocation: '',
      trailerLocation: '',
      nextEventETA: new Date(),
      nextEventStart: null,
      hos: 0,
      lastEventName: 'DROP',
      nextEventName: '',
      lastLocation: ' BRAMPTON TERMINAL - BRAMPTON 25 PRODUCTION ROAD',
      nextLocation: ' ',
      nextCity: '',
      nextState: '',
      lastCity: 'BRAMPTON',
      category: 'REGULAR',
      dispatcher: 'Sunaina',
      modifiedBy: 'Sunaina',
      status: 'Dispatched',
      nextEventSeqId: 0,
      lastEventSeqId: 5,
      lastEventFinish: new Date('2021-10-16T22:45:00.000Z'),
      lastEventStart: new Date('2021-10-16T21:45:00.000Z'),
      lastEventETA: new Date('2021-10-16T21:45:00.000Z'),
      pendingActions: [
        {
          tripId: '1a66e1f6-d259-414d-aa0f-08d990060183',
          value: 'NOT SUBMITTED',
          createdOn: new Date('2021-10-16T19:02:17.3717301+00:00'),
          createdBy: 'Sunaina@chargerlogistics.com',
          modifiedOn: new Date('2021-10-16T19:03:58.9658404+00:00'),
          modifiedBy: 'Sunaina@chargerlogistics.com',
          auxItem: 'ACE Status'
        },
        {
          tripId: '1a66e1f6-d259-414d-aa0f-08d990060183',
          value: 'Missing',
          createdOn: new Date('2021-10-18T16:44:31.180935+00:00'),
          createdBy: 'Syed@chargerlogistics.com',
          modifiedOn: new Date('2021-10-18T16:44:40.5856282+00:00'),
          modifiedBy: 'Syed@chargerlogistics.com',
          auxItem: 'Probill Pickup Info'
        }
      ],
      icons: {
        isBrandNewTrip: false,
        appointment: { missingAppointment: false, confirmedAppointment: false },
        ace: { danger: true, warning: false, success: false },
        aci: { danger: false, warning: false, success: false },
        fuelWarning: false,
        nextEvent: {
          cross: true,
          redExclamation: false,
          dangerUnableCalc: true,
          danger: false,
          warning: false,
          success: false
        },
        finalEvent: {
          cross: true,
          redExclamation: false,
          dangerUnableCalc: false,
          danger: false,
          warning: false,
          success: true
        }
      },
      isExpanded: true
    },
    icons: { confirmedAppointment: false, missingAppointment: true }
  },
  {
    eventNumber: '648eeb82-4898-4d9f-43a8-08d94d1f24ab',
    startTime: new Date('2021-10-16T21:45:00.000Z'),
    endTime: new Date('2021-10-16T22:45:00.000Z'),
    eventName: 'DROP',
    probillNo: '',
    probillId: '',
    isPowerUnit: true,
    equipmentId: '',
    equipmentUnit: 'XPRESS-X0706',
    equipmentStatus: 1,
    equipmentStatusDesc: 'Loaded',
    location: ' BRAMPTON TERMINAL - BRAMPTON 25 PRODUCTION ROAD',
    locationId: '8f717def-c1ed-4971-9a22-d8d39b4eaea7',
    city: 'BRAMPTON',
    code: 'ON',
    cityWithState: 'BRAMPTON, ON',
    etaDate: new Date('2021-10-16T21:45:00.000Z'),
    longitude: -79.669077,
    latitude: 43.7153411,
    orderId: '',
    status: 'COMPLETED',
    sequence: 5,
    scheduledDateTime: new Date('2021-10-16T21:45:00.000Z'),
    locationTimeMsDif: 3599750,
    eventType: {
      name: 'DROP',
      description: 'DROP',
      id: '815b2373-7c99-44f5-a704-1514c037505e',
      createdOn: '0001-01-01T00:00:00+00:00',
      modifiedOn: new Date('2021-08-04T18:25:18.6194012-04:00'),
      isRowDeleted: false
    },
    tripId: '1a66e1f6-d259-414d-aa0f-08d990060183',
    contractId: 0,
    sequenceId: 5,
    truck: {
      id: 'e72737c0-3e82-4d9e-35e7-08d94d37fc01',
      unitNo: '19498-21RP',
      powerUnit: 1,
      truckCategoryId: '0413c07c-4ca6-44dc-e7d2-08d9099dec04',
      truckStatusId: '00746c88-9dca-44c0-b3e2-08d906756b4e'
    },
    trailer: {
      id: '648eeb82-4898-4d9f-43a8-08d94d1f24ab',
      unitNo: 'XPRESS-X0706',
      trailerStatusId: 'c7cc88bd-7a9d-4151-006c-08d90c19afdc'
    },
    localEtaDate: new Date('2021-10-16T16:45:00'),
    currentLocationDate: new Date('2021-10-20T15:31:36.5847894'),
    etAdate: new Date('2021-10-16T22:12:00+00:00'),
    localStartTime: new Date('2021-10-16T16:45:00'),
    localFinishTime: new Date('2021-10-16T17:45:00'),
    finishTime: new Date('2021-10-16T21:45:00+00:00'),
    eventLogStatus: {
      name: 'COMPLETED',
      id: 'af916d82-e416-4be9-87b4-e00d9fb62612',
      createdOn: '0001-01-01T00:00:00+00:00',
      isRowDeleted: false
    },
    id: '14457c36-3589-4795-ad1f-08d99020a5cb',
    createdOn: new Date('2021-10-16T21:45:11.6264657+00:00'),
    createdBy: 'Sunaina@chargerlogistics.com',
    modifiedOn: new Date('2021-10-16T21:45:21.9987966+00:00'),
    modifiedBy: 'Sunaina@chargerlogistics.com',
    isRowDeleted: false,
    trip: {
      tripId: '1a66e1f6-d259-414d-aa0f-08d990060183',
      externalId: 735599,
      trip: 'T735599',
      tripWithIcons: 'T735599',
      drvCode: 'NIRBHAI',
      driver: 'NIRBHAI SINGH',
      leadDriverId: '1cc8e255-f650-4bef-4a9c-08d94d37fc33',
      teamDriverId: '',
      truck: '19498-21RP',
      trailer1: 'XPRESS-X0706',
      lastDate: new Date('2021-10-16T21:45:00.000Z'),
      nextDate: new Date(),
      startTime: new Date('2021-10-16T19:51:00.000Z'),
      finishTime: new Date(),
      truckLocation: '',
      trailerLocation: '',
      nextEventETA: new Date(),
      nextEventStart: null,
      hos: 0,
      lastEventName: 'DROP',
      nextEventName: '',
      lastLocation: ' BRAMPTON TERMINAL - BRAMPTON 25 PRODUCTION ROAD',
      nextLocation: ' ',
      nextCity: '',
      nextState: '',
      lastCity: 'BRAMPTON',
      category: 'REGULAR',
      dispatcher: 'Sunaina',
      modifiedBy: 'Sunaina',
      status: 'Dispatched',
      nextEventSeqId: 0,
      lastEventSeqId: 5,
      lastEventFinish: new Date('2021-10-16T22:45:00.000Z'),
      lastEventStart: new Date('2021-10-16T21:45:00.000Z'),
      lastEventETA: new Date('2021-10-16T21:45:00.000Z'),
      pendingActions: [
        {
          tripId: '1a66e1f6-d259-414d-aa0f-08d990060183',
          value: 'NOT SUBMITTED',
          createdOn: new Date('2021-10-16T19:02:17.3717301+00:00'),
          createdBy: 'Sunaina@chargerlogistics.com',
          modifiedOn: new Date('2021-10-16T19:03:58.9658404+00:00'),
          modifiedBy: 'Sunaina@chargerlogistics.com',
          auxItem: 'ACE Status'
        },
        {
          tripId: '1a66e1f6-d259-414d-aa0f-08d990060183',
          value: 'Missing',
          createdOn: new Date('2021-10-18T16:44:31.180935+00:00'),
          createdBy: 'Syed@chargerlogistics.com',
          modifiedOn: new Date('2021-10-18T16:44:40.5856282+00:00'),
          modifiedBy: 'Syed@chargerlogistics.com',
          auxItem: 'Probill Pickup Info'
        }
      ],
      icons: {
        isBrandNewTrip: false,
        appointment: { missingAppointment: false, confirmedAppointment: false },
        ace: { danger: true, warning: false, success: false },
        aci: { danger: false, warning: false, success: false },
        fuelWarning: false,
        nextEvent: {
          cross: true,
          redExclamation: false,
          dangerUnableCalc: true,
          danger: false,
          warning: false,
          success: false
        },
        finalEvent: {
          cross: true,
          redExclamation: false,
          dangerUnableCalc: false,
          danger: false,
          warning: false,
          success: true
        }
      },
      isExpanded: true
    },
    icons: { confirmedAppointment: false, missingAppointment: false }
  }
];