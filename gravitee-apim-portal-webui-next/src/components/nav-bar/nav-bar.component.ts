/*
 * Copyright (C) 2024 The Gravitee team (http://gravitee.io)
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *         http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import { Component, inject } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { isEmpty } from 'lodash';

import { NavBarButtonComponent } from './nav-bar-button/nav-bar-button.component';
import { CurrentUserService } from '../../services/current-user.service';
import { CompanyTitleComponent } from '../company-title/company-title.component';
import { UserAvatarComponent } from '../user-avatar/user-avatar.component';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [MatButton, CompanyTitleComponent, RouterLink, NavBarButtonComponent, UserAvatarComponent],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.scss',
})
export class NavBarComponent {
  currentUser = inject(CurrentUserService).user;
  protected readonly isEmpty = isEmpty;
}
