import { IdNameDto } from 'common/dto';

class OrganizationsApi {
    getOrganizations(): Promise<IdNameDto[]> {
        return Promise.resolve([]);
    }
}

export default new OrganizationsApi();
