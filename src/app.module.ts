import { Module } from '@nestjs/common';
import { TypedConfigModule, remoteLoader } from 'nest-typed-config';
import { RemoteConfig } from './config/config.model';
import { AppService } from './app.service';
import { AppController } from './app.controller';

@Module({
  imports: [
    TypedConfigModule.forRootAsync({
      schema: RemoteConfig,
      load: remoteLoader(
        'http://localhost:32001/applications/eks-app/environments/Production/configurations/eks-app-config-profile',
        {
          type: () => 'json',
          mapResponse: (response) => {
            console.log('Response:', response);
            return {
              host: response.host,
              port: parseInt(response.port, 10),
            };
          },
          shouldRetry: (response) => response.status !== 200,
          retries: 3,
          retryInterval: 3000,
        }
      ),
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
