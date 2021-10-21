import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { UserAuthSettingsService } from '@core/services/user-auth-settings.service';
import {
  IgxToastComponent,
  IgxToastPosition
} from '@infragistics/igniteui-angular';
import { UserAuthSettings } from '@shared/models/user-auth-settings.model';
import { SubSink } from 'subsink';
import { EnvService } from '@core/services/env.service';
import { UserPreferencesService } from '@core/services/user-preferences.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  // Private members
  private subs = new SubSink();

  // Public members
  showMessages: boolean | null = null;
  showBottomMessages: boolean | null = null;
  dynamicToolbarComponent: any;
  isUserAuthenticated = true;

  constructor(
    //private messagesEventBusService: EventBusService<MessageEvents>,
    //@Inject(MSAL_GUARD_CONFIG) private msalGuardConfig: MsalGuardConfiguration,
    //private authService: MsalService,
    private userAuthSettingsService: UserAuthSettingsService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Set Trimble Map API Key
    //TrimbleMaps.APIKey = this.environment.trimbleMapsKey;
    // Check if user already logged-in
    this.isUserAuthenticated = true;
    let account = {
      homeAccountId:
        'd0bbc869-2b93-47c8-b5ea-8f5727daa1d6.ff93404f-c1e7-43e5-ab53-a9b9d85c1f98',
      environment: 'login.windows.net',
      tenantId: 'ff93404f-c1e7-43e5-ab53-a9b9d85c1f98',
      username: 'Rodrigo.lopez@chargerlogistics.com',
      localAccountId: 'd0bbc869-2b93-47c8-b5ea-8f5727daa1d6',
      name: 'Rodrigo Lopez',
      idTokenClaims: {
        aud: 'bf653627-7f06-4d86-b3c5-adc92ea747cf',
        iss: 'https://login.microsoftonline.com/ff93404f-c1e7-43e5-ab53-a9b9d85c1f98/v2.0',
        iat: 1634664954,
        nbf: 1634664954,
        exp: 1634668854,
        aio: 'ATQAy/8TAAAAqDQqDtkY20VFyU/nizY/+xqvEJSrF3x7f5SkJbCViIBsj9dVlP54Bc+Mhu6QudKO',
        name: 'Rodrigo Lopez',
        nonce: '000d5280-1b3b-4baf-b0e3-4db7ffb1e83d',
        oid: 'd0bbc869-2b93-47c8-b5ea-8f5727daa1d6',
        preferred_username: 'Rodrigo.lopez@chargerlogistics.com',
        rh: '0.AQ0AT0CT_-fB5UOrU6m52FwfmCc2Zb8Gf4ZNs8WtyS6nR88NAPI.',
        sub: 'stYt0apSBwdkuaj9SJl_sq-8pcvA0SwelyDyEkdBGEc',
        tid: 'ff93404f-c1e7-43e5-ab53-a9b9d85c1f98',
        uti: '27asnmCVBk2iOQi3gjchAA',
        ver: '2.0'
      }
    };
    const newUserAuthSettings: UserAuthSettings = {
      displayName: account.name || '',

      role: (account?.idTokenClaims as any).role,
      username: account?.username
    };
    this.userAuthSettingsService.updateSettings(newUserAuthSettings);
    this.router.navigate([
      {
        outlets: {
          primary: ['trips']
        }
      }
    ]);
  }

  /**
   * Determines if the messagesOutlet route is in the url
   * @returns - true if the messagesOutlet route is in the url, otherise false
   */
  doesMessagesRouteExist(): boolean {
    const messagesRouteExists = this.router?.routerState?.root?.children?.find(
      (state) => {
        return state?.outlet?.toLowerCase() === 'messagesoutlet';
      }
    );
    return !!messagesRouteExists;
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
