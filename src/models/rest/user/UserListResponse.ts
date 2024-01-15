import {PageableRestResponse} from '@/models/rest/PageableRestResponse';
import {User} from '@/models/user/User';

export interface UserListResponse extends PageableRestResponse {

    users: Array<User>;

}
