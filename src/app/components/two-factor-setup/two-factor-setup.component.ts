import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TwoFactorSetupResponse } from '../../models/database.interfaces';

@Component({
  selector: 'app-two-factor-setup',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" *ngIf="isVisible">
      <div class="bg-white rounded-lg max-w-md w-full mx-4 max-h-[90vh] overflow-y-auto">
        <div class="p-6">
          <!-- Header -->
          <div class="flex items-center justify-between mb-6">
            <h3 class="text-xl font-semibold text-gray-900">Setup Two-Factor Authentication</h3>
            <button (click)="close()" class="text-gray-400 hover:text-gray-600">
              <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"/>
              </svg>
            </button>
          </div>

          <!-- Step 1: Instructions -->
          <div *ngIf="currentStep === 1" class="space-y-4">
            <div class="text-center">
              <div class="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg class="w-8 h-8 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clip-rule="evenodd"/>
                </svg>
              </div>
              <h4 class="text-lg font-medium text-gray-900">Secure Your Account</h4>
              <p class="text-sm text-gray-600 mt-2">Two-factor authentication adds an extra layer of security to your account by requiring a code from your phone in addition to your password.</p>
            </div>

            <div class="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h5 class="font-medium text-blue-900 mb-2">What you'll need:</h5>
              <ul class="text-sm text-blue-800 space-y-1">
                <li class="flex items-center">
                  <svg class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
                  </svg>
                  A smartphone or tablet
                </li>
                <li class="flex items-center">
                  <svg class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
                  </svg>
                  An authenticator app (Google Authenticator, Authy, etc.)
                </li>
              </ul>
            </div>

            <div class="flex space-x-3">
              <button (click)="nextStep()" 
                      style="background-color: #2c4170;" 
                      class="flex-1 text-white px-4 py-2 rounded-lg hover:opacity-90 transition-all font-medium">
                Continue
              </button>
              <button (click)="close()" 
                      class="flex-1 text-gray-600 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-all font-medium">
                Cancel
              </button>
            </div>
          </div>

          <!-- Step 2: QR Code -->
          <div *ngIf="currentStep === 2" class="space-y-4">
            <div class="text-center">
              <h4 class="text-lg font-medium text-gray-900 mb-2">Scan QR Code</h4>
              <p class="text-sm text-gray-600">Open your authenticator app and scan this QR code:</p>
            </div>

            <div *ngIf="!setupData" class="text-center py-8">
              <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
              <p class="text-sm text-gray-600 mt-2">Generating QR code...</p>
            </div>

            <div *ngIf="setupData" class="space-y-4">
              <div class="text-center">
                <div class="bg-white p-4 rounded-lg border-2 border-gray-200 inline-block">
                  <img [src]="setupData.qrCodeUrl" alt="QR Code" class="w-48 h-48">
                </div>
              </div>

              <!-- Manual entry option -->
              <div class="bg-gray-50 border border-gray-200 rounded-lg p-4">
                <h5 class="font-medium text-gray-900 mb-2">Can't scan? Enter manually:</h5>
                <div class="bg-white border border-gray-300 rounded p-3">
                  <code class="text-sm text-gray-800 break-all">{{ setupData.secret }}</code>
                </div>
              </div>

              <div class="flex space-x-3">
                <button (click)="nextStep()" 
                        style="background-color: #2c4170;" 
                        class="flex-1 text-white px-4 py-2 rounded-lg hover:opacity-90 transition-all font-medium">
                  Next
                </button>
                <button (click)="previousStep()" 
                        class="flex-1 text-gray-600 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-all font-medium">
                  Back
                </button>
              </div>
            </div>
          </div>

          <!-- Step 3: Verification -->
          <div *ngIf="currentStep === 3" class="space-y-4">
            <div class="text-center">
              <h4 class="text-lg font-medium text-gray-900 mb-2">Verify Setup</h4>
              <p class="text-sm text-gray-600">Enter the 6-digit code from your authenticator app to complete setup:</p>
            </div>

            <div class="space-y-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Verification Code</label>
                <input type="text" 
                       [(ngModel)]="verificationCode"
                       (input)="onCodeInput()"
                       placeholder="000000"
                       maxlength="6"
                       class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-center text-2xl font-mono tracking-widest"
                       [class.border-red-300]="verificationError"
                       autocomplete="off">
                <div *ngIf="verificationError" class="text-red-600 text-sm mt-1">{{ verificationError }}</div>
              </div>

              <div class="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <div class="flex">
                  <svg class="w-5 h-5 text-yellow-600 mr-2 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd"/>
                  </svg>
                  <div>
                    <h5 class="font-medium text-yellow-800">Important</h5>
                    <p class="text-sm text-yellow-700 mt-1">After enabling 2FA, you'll need your authenticator app every time you sign in. Make sure to save your backup codes in a safe place.</p>
                  </div>
                </div>
              </div>

              <div class="flex space-x-3">
                <button (click)="verify()" 
                        [disabled]="verificationCode.length !== 6 || isVerifying"
                        style="background-color: #2c4170;" 
                        class="flex-1 text-white px-4 py-2 rounded-lg hover:opacity-90 transition-all font-medium disabled:opacity-50 disabled:cursor-not-allowed">
                  <span *ngIf="!isVerifying">Enable 2FA</span>
                  <span *ngIf="isVerifying" class="flex items-center justify-center">
                    <svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                      <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                      <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Verifying...
                  </span>
                </button>
                <button (click)="previousStep()" 
                        [disabled]="isVerifying"
                        class="flex-1 text-gray-600 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-all font-medium disabled:opacity-50">
                  Back
                </button>
              </div>
            </div>
          </div>

          <!-- Step 4: Success & Backup Codes -->
          <div *ngIf="currentStep === 4" class="space-y-4">
            <div class="text-center">
              <div class="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg class="w-8 h-8 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
                </svg>
              </div>
              <h4 class="text-lg font-medium text-gray-900">2FA Enabled Successfully!</h4>
              <p class="text-sm text-gray-600 mt-2">Your account is now more secure with two-factor authentication.</p>
            </div>

            <div class="bg-red-50 border border-red-200 rounded-lg p-4">
              <h5 class="font-medium text-red-900 mb-2">Save Your Backup Codes</h5>
              <p class="text-sm text-red-800 mb-3">Store these backup codes in a safe place. You can use them to access your account if you lose your phone.</p>
              
              <div class="bg-white border border-red-300 rounded p-3 mb-3">
                <div class="grid grid-cols-2 gap-2 font-mono text-sm">
                  <div *ngFor="let code of setupData?.backupCodes" class="text-center py-1">{{ code }}</div>
                </div>
              </div>
              
              <button (click)="downloadBackupCodes()" 
                      class="text-red-700 hover:text-red-900 text-sm font-medium flex items-center">
                <svg class="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clip-rule="evenodd"/>
                </svg>
                Download Backup Codes
              </button>
            </div>

            <button (click)="complete()" 
                    style="background-color: #2c4170;" 
                    class="w-full text-white px-4 py-2 rounded-lg hover:opacity-90 transition-all font-medium">
              Complete Setup
            </button>
          </div>
        </div>
      </div>
    </div>
  `
})
export class TwoFactorSetupComponent implements OnInit {
  @Input() isVisible = false;
  @Input() userId!: number;
  @Output() setupComplete = new EventEmitter<boolean>();
  @Output() setupCancelled = new EventEmitter<void>();

  currentStep = 1;
  setupData?: TwoFactorSetupResponse;
  verificationCode = '';
  verificationError = '';
  isVerifying = false;

  ngOnInit(): void {
    if (this.isVisible && this.currentStep === 2) {
      this.generateQRCode();
    }
  }

  generateQRCode(): void {
    // Mock data - replace with actual API call
    setTimeout(() => {
      this.setupData = {
        secret: 'JBSWY3DPEHPK3PXP',
        qrCodeUrl: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg==',
        backupCodes: [
          '123456789',
          '987654321',
          '456789123',
          '789123456',
          '321654987',
          '654987321',
          '147258369',
          '369258147'
        ]
      };
    }, 1500);
  }

  nextStep(): void {
    if (this.currentStep === 1) {
      this.currentStep = 2;
      this.generateQRCode();
    } else if (this.currentStep === 2) {
      this.currentStep = 3;
    }
  }

  previousStep(): void {
    if (this.currentStep > 1) {
      this.currentStep--;
    }
  }

  onCodeInput(): void {
    this.verificationError = '';
    this.verificationCode = this.verificationCode.replace(/\D/g, '');
  }

  verify(): void {
    if (this.verificationCode.length !== 6) {
      this.verificationError = 'Please enter a 6-digit code';
      return;
    }

    this.isVerifying = true;
    this.verificationError = '';

    // Mock verification - replace with actual API call
    setTimeout(() => {
      if (this.verificationCode === '123456') {
        this.currentStep = 4;
        this.isVerifying = false;
      } else {
        this.verificationError = 'Invalid code. Please try again.';
        this.isVerifying = false;
        this.verificationCode = '';
      }
    }, 1500);
  }

  downloadBackupCodes(): void {
    if (!this.setupData?.backupCodes) return;

    const content = `Two-Factor Authentication Backup Codes\n\nGenerated: ${new Date().toLocaleString()}\n\n${this.setupData.backupCodes.join('\n')}\n\nImportant: Keep these codes safe and secure. Each code can only be used once.`;
    
    const blob = new Blob([content], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'backup-codes.txt';
    link.click();
    window.URL.revokeObjectURL(url);
  }

  complete(): void {
    this.setupComplete.emit(true);
    this.reset();
  }

  close(): void {
    this.setupCancelled.emit();
    this.reset();
  }

  private reset(): void {
    this.currentStep = 1;
    this.setupData = undefined;
    this.verificationCode = '';
    this.verificationError = '';
    this.isVerifying = false;
  }
}
