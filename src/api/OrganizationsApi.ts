import { IdNameDto } from 'common/dto';

class OrganizationsApi {
    getOrganizations(): Promise<IdNameDto[]> {
        return fetch('/mock/organizations.json')
            .then(response => response.json());
    }
}

export default new OrganizationsApi();
