import { Injectable } from '@nestjs/common';
import { RemoteConfig } from './config/config.model';

@Injectable()
export class AppService {
  constructor(private config: RemoteConfig) {}

  public show(): any {
    const rHost = this.config.host;
    const rPort = this.config.port;

    const out = [
      `config.host: ${rHost}`,
      `config.port: ${rPort}`,
    ].join('\n');

    return `${out}\n`;
  }
}
