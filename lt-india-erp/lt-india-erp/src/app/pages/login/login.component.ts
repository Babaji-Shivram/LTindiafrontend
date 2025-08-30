import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { LoadingTruckComponent } from '../../shared/loading-truck/loading-truck.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, LoadingTruckComponent],
  template: `
    <div class="min-h-screen flex">
      <!-- Left Panel - Branding with Sliding Content -->
      <div class="hidden lg:flex lg:w-1/2 xl:w-3/5 relative overflow-hidden" style="background: linear-gradient(135deg, #2c4170 0%, #1e2a4a 100%);">
        <!-- Background Pattern -->
        <div class="absolute inset-0 opacity-10">
          <div class="absolute top-0 left-0 w-full h-full bg-blue-400 bg-opacity-5"></div>
        </div>
        
        <div class="relative flex flex-col justify-center px-8 lg:px-12 xl:px-16 text-white min-h-full py-12 w-full max-w-full">
          <!-- Horizontal Scrolling Content -->
          <div class="slider-container overflow-hidden mb-8 h-96 relative w-full">
            <div class="slider-track flex transition-transform duration-1000 ease-in-out w-full">
              <!-- Slide 1 - Core Platform -->
              <div class="slide min-w-full flex-shrink-0 pr-4">
                <h2 class="page-title font-bold leading-tight mb-4 break-words">
                  Complete Shipping<br>
                  <span class="text-blue-200">Management Platform</span>
                </h2>
                <p class="text-base lg:text-lg text-blue-100 mb-6 leading-relaxed break-words">
                  Streamline your entire shipping workflow from booking to delivery
                  with our comprehensive logistics management system.
                </p>
                <div class="space-y-3">
                  <div class="flex items-center">
                    <div class="w-6 h-6 bg-green-400 rounded-full flex items-center justify-center mr-3">
                      <svg class="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
                      </svg>
                    </div>
                    <span class="text-blue-100">Unified booking management</span>
                  </div>
                  <div class="flex items-center">
                    <div class="w-6 h-6 bg-green-400 rounded-full flex items-center justify-center mr-3">
                      <svg class="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
                      </svg>
                    </div>
                    <span class="text-blue-100">End-to-end workflow automation</span>
                  </div>
                  <div class="flex items-center">
                    <div class="w-6 h-6 bg-green-400 rounded-full flex items-center justify-center mr-3">
                      <svg class="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
                      </svg>
                    </div>
                    <span class="text-blue-100">Integrated billing & invoicing</span>
                  </div>
                </div>
              </div>

              <!-- Slide 2 - Real-time Tracking -->
              <div class="slide min-w-full flex-shrink-0 pr-4">
                <h2 class="page-title font-bold leading-tight mb-4 break-words">
                  Real-time<br>
                  <span class="text-blue-200">Shipment Tracking</span>
                </h2>
                <p class="text-base lg:text-lg text-blue-100 mb-6 leading-relaxed break-words">
                  Monitor your shipments in real-time with advanced GPS tracking
                  and automated status updates for complete visibility.
                </p>
                <div class="space-y-3">
                  <div class="flex items-center">
                    <div class="w-6 h-6 bg-green-400 rounded-full flex items-center justify-center mr-3">
                      <svg class="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
                      </svg>
                    </div>
                    <span class="text-blue-100">Live GPS tracking</span>
                  </div>
                  <div class="flex items-center">
                    <div class="w-6 h-6 bg-green-400 rounded-full flex items-center justify-center mr-3">
                      <svg class="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
                      </svg>
                    </div>
                    <span class="text-blue-100">Automated notifications</span>
                  </div>
                  <div class="flex items-center">
                    <div class="w-6 h-6 bg-green-400 rounded-full flex items-center justify-center mr-3">
                      <svg class="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
                      </svg>
                    </div>
                    <span class="text-blue-100">Delivery confirmations</span>
                  </div>
                </div>
              </div>

              <!-- Slide 3 - Analytics & Reports -->
              <div class="slide min-w-full flex-shrink-0 pr-4">
                <h2 class="page-title font-bold leading-tight mb-4 break-words">
                  Advanced<br>
                  <span class="text-blue-200">Analytics & Reports</span>
                </h2>
                <p class="text-base lg:text-lg text-blue-100 mb-6 leading-relaxed break-words">
                  Make data-driven decisions with comprehensive analytics,
                  performance metrics, and customizable reporting tools.
                </p>
                <div class="space-y-3">
                  <div class="flex items-center">
                    <div class="w-6 h-6 bg-green-400 rounded-full flex items-center justify-center mr-3">
                      <svg class="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
                      </svg>
                    </div>
                    <span class="text-blue-100">Performance dashboards</span>
                  </div>
                  <div class="flex items-center">
                    <div class="w-6 h-6 bg-green-400 rounded-full flex items-center justify-center mr-3">
                      <svg class="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
                      </svg>
                    </div>
                    <span class="text-blue-100">Custom report generation</span>
                  </div>
                  <div class="flex items-center">
                    <div class="w-6 h-6 bg-green-400 rounded-full flex items-center justify-center mr-3">
                      <svg class="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
                      </svg>
                    </div>
                    <span class="text-blue-100">Cost optimization insights</span>
                  </div>
                </div>
              </div>
            </div>

            <!-- Pagination Dots -->
            <div class="flex justify-start space-x-3 mt-8 mb-6">
              <div class="dot w-3 h-3 rounded-full bg-white cursor-pointer transition-opacity duration-300" 
                   [class.opacity-100]="currentSlide === 0" 
                   [class.opacity-40]="currentSlide !== 0"
                   (click)="goToSlide(0)"></div>
              <div class="dot w-3 h-3 rounded-full bg-white cursor-pointer transition-opacity duration-300" 
                   [class.opacity-100]="currentSlide === 1" 
                   [class.opacity-40]="currentSlide !== 1"
                   (click)="goToSlide(1)"></div>
              <div class="dot w-3 h-3 rounded-full bg-white cursor-pointer transition-opacity duration-300" 
                   [class.opacity-100]="currentSlide === 2" 
                   [class.opacity-40]="currentSlide !== 2"
                   (click)="goToSlide(2)"></div>
            </div>
          </div>
        </div>
      </div>

      <!-- Right Panel - Login Form -->
      <div class="w-full lg:w-1/2 xl:w-2/5 flex items-start justify-center px-6 pt-16 pb-12 bg-gray-50">
        <div class="w-full max-w-md">
          <!-- Mobile Logo (hidden) -->
          <div class="hidden">
            <div class="inline-flex items-center justify-center w-16 h-16 bg-blue-800 rounded-xl mb-4">
              <img src="/BABAJI LOGO.svg" alt="Babaji Logo" class="w-10 h-10 filter brightness-0 invert">
            </div>
            <h1 class="page-title text-gray-900">Babaji Shivram</h1>
          </div>

          <div class="bg-white rounded-2xl p-8 login-card-3d" *ngIf="!isLoading">
            <!-- Logo -->
            <div class="text-center mb-8">
              <img src="/BABAJI LOGO.svg" alt="Babaji Shivram" class="h-24 w-auto mx-auto mb-4">
              <h1 class="page-title text-gray-800">Sign in to your account</h1>
            </div>

            <!-- Login Form -->
            <form (ngSubmit)="onLogin()" class="space-y-6">
              <div>
                <label for="email" class="block text-sm font-medium text-gray-700 mb-2">Email</label>
                <input
                  type="email"
                  id="email"
                  [(ngModel)]="email"
                  name="email"
                  required
                  class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                  placeholder="admin@ltindia.com"
                >
              </div>

              <div>
                <label for="password" class="block text-sm font-medium text-gray-700 mb-2">Password</label>
                <div class="relative">
                  <input
                    [type]="showPassword ? 'text' : 'password'"
                    id="password"
                    [(ngModel)]="password"
                    name="password"
                    required
                    class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors pr-12"
                    placeholder="Enter your password"
                  >
                  <button
                    type="button"
                    (click)="togglePassword()"
                    class="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                  >
                    <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                            [attr.d]="showPassword ? 'M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21' : 'M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z'">
                      </path>
                    </svg>
                  </button>
                </div>
              </div>

              <div class="flex items-center justify-between">
                <div class="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    [(ngModel)]="rememberMe"
                    class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  >
                  <label for="remember-me" class="ml-2 block text-sm text-gray-700">
                    Remember me
                  </label>
                </div>

                <div class="text-sm">
                  <a href="#" class="font-medium text-blue-600 hover:text-blue-500">
                    Forgot your password?
                  </a>
                </div>
              </div>

              <button
                type="submit"
                class="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
              >
                Sign in
              </button>
            </form>
          </div>

          <!-- Loading Animation -->
          <div *ngIf="isLoading" class="bg-white rounded-2xl p-8 login-card-3d">
            <!-- Logo (same as login card) -->
            <div class="text-center mb-8">
              <img src="/BABAJI LOGO.svg" alt="Babaji Shivram" class="h-24 w-auto mx-auto mb-4">
              <h1 class="page-title text-gray-800">Signing you in...</h1>
            </div>
            
            <!-- Loading Animation -->
            <div class="flex flex-col items-center justify-center py-8">
              <div class="flex items-center justify-center mb-4">
                <app-loading-truck></app-loading-truck>
              </div>
              <p class="text-gray-600 text-center">Please wait while we authenticate your credentials</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .login-card-3d {
      box-shadow: 
        0 25px 50px -12px rgba(44, 65, 112, 0.25),
        0 10px 20px -5px rgba(44, 65, 112, 0.1),
        0 0 0 1px rgba(44, 65, 112, 0.05);
      transform: translateY(0px) rotateX(2deg) rotateY(-1deg);
      transition: all 0.4s cubic-bezier(0.4, 0.0, 0.2, 1);
      transform-style: preserve-3d;
      perspective: 1000px;
    }

    .login-card-3d:hover {
      transform: translateY(-8px) rotateX(0deg) rotateY(0deg) scale(1.02);
      box-shadow: 
        0 35px 70px -12px rgba(44, 65, 112, 0.35),
        0 15px 30px -5px rgba(44, 65, 112, 0.15),
        0 0 0 1px rgba(44, 65, 112, 0.08);
    }

    .login-card-3d::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: linear-gradient(135deg, rgba(255,255,255,0.1) 0%, transparent 50%, rgba(44, 65, 112, 0.05) 100%);
      border-radius: 1rem;
      pointer-events: none;
      z-index: 1;
    }

    .login-card-3d > * {
      position: relative;
      z-index: 2;
    }

    .slider-track {
      transition: transform 0.5s ease-in-out;
    }

    .slide {
      flex: 0 0 100%;
    }

    .dot:hover {
      opacity: 0.8 !important;
    }
  `]
})
export class LoginComponent implements OnInit, OnDestroy {
  email = 'admin@ltindia.com';
  password = 'password';
  rememberMe = false;
  showPassword = false;
  isLoading = false;
  currentSlide = 0;
  totalSlides = 3;
  private slideInterval: any;

  constructor(private router: Router) {}

  ngOnInit() {
    this.startSlideShow();
  }

  ngOnDestroy() {
    if (this.slideInterval) {
      clearInterval(this.slideInterval);
    }
  }

  startSlideShow() {
    this.slideInterval = setInterval(() => {
      this.nextSlide();
    }, 5000);
  }

  nextSlide() {
    this.currentSlide = (this.currentSlide + 1) % this.totalSlides;
    this.updateSlider();
  }

  goToSlide(index: number) {
    this.currentSlide = index;
    this.updateSlider();
    // Restart the interval when user manually navigates
    if (this.slideInterval) {
      clearInterval(this.slideInterval);
      this.startSlideShow();
    }
  }

  private updateSlider() {
    const slider = document.querySelector('.slider-track') as HTMLElement;
    if (slider) {
      slider.style.transform = `translateX(-${this.currentSlide * 100}%)`;
    }
  }

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  onLogin() {
    if (this.email === 'admin@ltindia.com' && this.password === 'password') {
      this.isLoading = true;
      
      setTimeout(() => {
        this.isLoading = false;
        this.router.navigate(['/dashboard']);
      }, 2000);
    } else {
      alert('Invalid credentials');
    }
  }
}