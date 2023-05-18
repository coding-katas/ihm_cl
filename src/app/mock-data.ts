import { InMemoryDbService } from 'angular-in-memory-web-api';

import { Person } from './persons/person';
import { Customer } from './infos/customer';

export class MockData implements InMemoryDbService {

    createDb(): any {
        const persons: Person[] = [
            {
                id: 1,
                personContId: '111111',
                personPID: '2222222',
                externId: '333333333',
                contractId: '33333333333333333',
                contactMean: '4444444444444444444',
                name: 'Jean',
                firstName: 'Robert',
                state: 'active'
            },
            {
                id: 2,
                personContId: '2111111',
                personPID: '32222222',
                externId: '4333333333',
                contractId: '533333333333333333',
                contactMean: '64444444444444444444',
                name: 'Jean',
                firstName: 'Robert',
                state: 'active'
            },
            {
                id: 5,
                personContId: '3111111',
                personPID: '42222222',
                externId: '5333333333',
                contractId: '633333333333333333',
                contactMean: '74444444444444444444',
                name: 'Jean',
                firstName: 'Robert',
                state: 'active'
            },
            {
                id: 8,
                personContId: '4111111',
                personPID: '52222222',
                externId: '6333333333',
                contractId: '733333333333333333',
                contactMean: '84444444444444444444',
                name: 'Jean',
                firstName: 'Robert',
                state: 'active'
            },
            {
                id: 10,
                personContId: '5111111',
                personPID: '62222222',
                externId: '7333333333',
                contractId: '833333333333333333',
                contactMean: '94444444444444444444',
                name: 'Jean',
                firstName: 'Robert',
                state: 'active'
            }
        ];

        const infos: Customer[] = [
          {
            id: 1001,
            name: 'Sakis Manal',
            country: {
              name: 'Greece',
              code: 'GR'
            },
            company: 'Dev Inc.',
            status: 'qualified',
            lifetimeValue: 5000,
            image: 'https://randomuser.me/api/portraits/men/32.jpg'
          },
          {
            id: 1002,
            name: 'Nikos Poul',
            country: {
              name: 'Brazil',
              code: 'BR'
            },
            company: 'Reyxap C.A',
            status: 'proposal',
            lifetimeValue: 3000,
            image: 'https://randomuser.me/api/portraits/men/46.jpg'
          },
          {
            id: 1003,
            name: 'Stavros Polast',
            country: {
              name: 'Switzerland',
              code: 'CH'
            },
            company: 'BMW Inc.',
            status: 'unqualified',
            lifetimeValue: 4000,
            image: 'https://randomuser.me/api/portraits/men/36.jpg'
          },
          {
            id: 1004,
            name: 'Giota MIller',
            country: {
              name: 'Argentina',
              code: 'AR'
            },
            company: 'Audi Corp.',
            status: 'qualified',
            lifetimeValue: 2000,
            image: 'https://randomuser.me/api/portraits/women/2.jpg'
          },
          {
            id: 1005,
            name: 'Elis Nalb',
            country: {
              name: 'Germany',
              code: 'DE'
            },
            company: 'General Electric',
            status: 'new',
            lifetimeValue: 1000,
            image: 'https://randomuser.me/api/portraits/women/47.jpg'
          },
          {
            id: 1006,
            name: 'Alex Ion',
            country: {
              name: 'Norway',
              code: 'NO'
            },
            company: 'Apple Inc.',
            status: 'unqualified',
            lifetimeValue: 2500,
            image: 'https://randomuser.me/api/portraits/men/4.jpg'
          },
          {
            id: 1007,
            name: 'Andriou Araz',
            country: {
              name: 'Czech Republic',
              code: 'CZ'
            },
            company: 'Toolbox C.A',
            status: 'proposal',
            lifetimeValue: 3200,
            image: 'https://randomuser.me/api/portraits/men/33.jpg'
          },
          {
            id: 1008,
            name: 'Kostas Lek',
            country: {
              name: 'United Kingdom',
              code: 'GB'
            },
            company: 'Microsoft Corp.',
            status: 'new',
            lifetimeValue: 1500,
            image: 'https://randomuser.me/api/portraits/men/12.jpg'
          },
          {
            id: 1009,
            name: 'Panos Pap',
            country: {
              name: 'Cyprus',
              code: 'CY'
            },
            company: 'KIA Automotive',
            status: 'renewal',
            lifetimeValue: 2400,
            image: 'https://randomuser.me/api/portraits/men/15.jpg'
          },
          {
            id: 1010,
            name: 'Maria Zouk',
            country: {
              name: 'Finland',
              code: 'FI'
            },
            company: 'Program Team',
            status: 'negotiation',
            lifetimeValue: 4100,
            image: 'https://randomuser.me/api/portraits/women/27.jpg'
          }
        ];
        return { persons, infos };
    }
}
