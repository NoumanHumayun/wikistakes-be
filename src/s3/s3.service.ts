import * as aws from 'aws-sdk';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { v1 as UUID } from 'uuid';

import { SUPPORTED_DOC_TYPES } from './doc-types';

@Injectable()
export class S3Service {
  private bucket: string;
  private s3: aws.S3;

  constructor(private readonly config: ConfigService) {
    const awsConfig = this.config.get('aws');
    const { bucket, ...rest } = awsConfig;
    this.bucket = bucket;
    this.s3 = new aws.S3(rest);
  }

  public async upload(
    Body: any,
    ContentType: string,
    ContentEncoding: string,
    Metadata: any,
    path?: string
  ): Promise<string> {
    try {
      const b = this.bucket + `/${path}`;

      const Key = UUID().replace(/\-/g, '');
      await this.s3
        .upload({
          Bucket: b,
          Key,
          Body: Body,
          ACL: 'public-read',
          ContentType,
          ContentEncoding: String(ContentEncoding),
          Metadata
        })
        .promise();
      return path ? path + '/' + Key : Key;
    } catch (exception) {
      console.error(exception);
      throw exception;
    }
  }

  async deleteFile(Key: string) {
    return this.s3
      .deleteObject({
        Bucket: this.bucket,
        Key
      })
      .promise();
  }

  public async download(Key: string) {
    const subDomain = Key.split('/')[0];
    const { Metadata } = await this.s3
      .headObject({ Bucket: this.bucket, Key })
      .promise();

    const stream = await this.s3
      .getObject({
        Bucket: this.bucket,
        Key
      })
      .promise();

    return { file: stream.Body.toString('base64'), ...Metadata };
  }

  public async getMetadata(Key: string) {
    try {
      const { Metadata } = await this.s3
        .headObject({ Bucket: this.bucket, Key })
        .promise();
      return Metadata;
    } catch (error) {
      console.error(error);
    }
  }

  async getFile(
    Key: string
  ): Promise<{ file: aws.S3.Body; metadata: aws.S3.Metadata }> {
    const subDomain = Key.split('/')[0];

    const { Metadata } = await this.s3
      .headObject({ Bucket: this.bucket, Key })
      .promise();

    const stream = await this.s3
      .getObject({
        Bucket: this.bucket,
        Key
      })
      .promise();

    return { file: stream.Body, metadata: Metadata };
  }

  public async stream(Key: string) {
    const { Metadata } = await this.s3
      .headObject({ Bucket: this.bucket, Key })
      .promise();

    const stream = this.s3
      .getObject({
        Bucket: this.bucket,
        Key
      })
      .createReadStream();

    return { stream, ...Metadata };
  }
}
