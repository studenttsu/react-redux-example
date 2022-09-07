import axios from 'axios';
import { OrganizationShortDto } from 'common/dto';

class OrganizationsApi {
    getOrganizations(): Promise<OrganizationShortDto[]> {
        return axios('/mock/organizations.json', {
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => response.data.organizations);
    }
}

export default new OrganizationsApi();
