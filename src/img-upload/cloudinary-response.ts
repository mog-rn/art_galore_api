import { UploadApiResponse } from 'cloudinary';

export interface CloudinaryResponse extends UploadApiResponse {
  asset_id?: string;
  version_id?: string;
}
