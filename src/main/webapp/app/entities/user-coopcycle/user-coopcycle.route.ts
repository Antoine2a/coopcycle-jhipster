import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IUserCoopcycle, UserCoopcycle } from 'app/shared/model/user-coopcycle.model';
import { UserCoopcycleService } from './user-coopcycle.service';
import { UserCoopcycleComponent } from './user-coopcycle.component';
import { UserCoopcycleDetailComponent } from './user-coopcycle-detail.component';
import { UserCoopcycleUpdateComponent } from './user-coopcycle-update.component';

@Injectable({ providedIn: 'root' })
export class UserCoopcycleResolve implements Resolve<IUserCoopcycle> {
  constructor(private service: UserCoopcycleService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IUserCoopcycle> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((userCoopcycle: HttpResponse<UserCoopcycle>) => {
          if (userCoopcycle.body) {
            return of(userCoopcycle.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new UserCoopcycle());
  }
}

export const userCoopcycleRoute: Routes = [
  {
    path: '',
    component: UserCoopcycleComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'myblogApp.userCoopcycle.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: UserCoopcycleDetailComponent,
    resolve: {
      userCoopcycle: UserCoopcycleResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'myblogApp.userCoopcycle.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: UserCoopcycleUpdateComponent,
    resolve: {
      userCoopcycle: UserCoopcycleResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'myblogApp.userCoopcycle.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: UserCoopcycleUpdateComponent,
    resolve: {
      userCoopcycle: UserCoopcycleResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'myblogApp.userCoopcycle.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];
