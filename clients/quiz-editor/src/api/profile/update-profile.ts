import { type Profile } from '@/type/profile';

export interface UpdateProfileRequest {
  profile: Partial<Profile>,
}

export interface UpdateProfileResponse {
  profile: Profile,
}

export function createUpdateProfileFunction(apiUrl: string): (
  request: UpdateProfileRequest,
) => Promise<UpdateProfileResponse> {
  return (request: UpdateProfileRequest): Promise<UpdateProfileResponse> => {
    const url = new URL(`${apiUrl}/profile/my`);
    return fetch(url.toString(),{
      method: 'PATCH',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(request.profile),
    }).then((resp) => resp.json())
      .then((resp: UpdateProfileResponse) => resp);
  };
}