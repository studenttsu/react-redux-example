import { OrganizationShortDto } from 'common/dto';

class OrganizationsApi {
    getOrganizations(): Promise<OrganizationShortDto[]> {
        return fetch('/mock/organizations.json')
            .then(response => response.json())
            .then(data => data.organizations);
    }
}

export default new OrganizationsApi();
