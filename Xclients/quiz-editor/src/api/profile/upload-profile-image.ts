export interface UploadProfileImageRequest {
  files: FileList | undefined,
}

export interface UploadProfileImageResponse {
  imageUrl: string,
}

export function createUploadProfileImageFunction(apiUrl: string): (
  request: UploadProfileImageRequest,
) => Promise<UploadProfileImageResponse> {
  return (request: UploadProfileImageRequest): Promise<UploadProfileImageResponse> => {
    const url = new URL(`${apiUrl}/profile/my/image`);
    const formData = new FormData();
    if (request.files) {
      const file = request.files[0] as File;
      formData.append('file', file);
    }
    return fetch(url.toString(),{
      method: 'POST',
      credentials: 'include',
      body: formData,
    }).then((resp) => resp.json())
      .then((resp: UploadProfileImageResponse) => resp);
  };
}