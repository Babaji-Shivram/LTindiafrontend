import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

/**
 * Enhanced Lead Validation Service
 * Provides comprehensive validation patterns for CRM lead management
 */
export class LeadValidationService {

  /**
   * Validates Indian phone numbers with multiple formats
   */
  static indianPhoneValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.value) return null;
      
      const phonePattern = /^(\+91[-\s]?)?[0]?(91)?[789]\d{9}$/;
      const isValid = phonePattern.test(control.value.replace(/\s+/g, ''));
      
      return isValid ? null : { 
        invalidIndianPhone: { 
          value: control.value,
          message: 'Enter a valid Indian mobile number (e.g., +91 9876543210, 9876543210)' 
        }
      };
    };
  }

  /**
   * Validates business email addresses with domain restrictions
   */
  static businessEmailValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.value) return null;
      
      // Basic email pattern
      const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      
      if (!emailPattern.test(control.value)) {
        return { 
          invalidEmail: { 
            value: control.value,
            message: 'Enter a valid email address' 
          }
        };
      }
      
      // Exclude common personal email domains for business validation
      const personalDomains = ['gmail.com', 'yahoo.com', 'hotmail.com', 'outlook.com', 'rediffmail.com'];
      const domain = control.value.split('@')[1]?.toLowerCase();
      
      if (personalDomains.includes(domain)) {
        return { 
          personalEmail: { 
            value: control.value,
            message: 'Please provide a business email address' 
          }
        };
      }
      
      return null;
    };
  }

  /**
   * Validates Indian GST numbers
   */
  static gstValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.value) return null;
      
      const gstPattern = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/;
      const isValid = gstPattern.test(control.value.toUpperCase());
      
      return isValid ? null : { 
        invalidGST: { 
          value: control.value,
          message: 'Enter a valid GST number (e.g., 22AAAAA0000A1Z5)' 
        }
      };
    };
  }

  /**
   * Validates Indian PAN numbers
   */
  static panValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.value) return null;
      
      const panPattern = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
      const isValid = panPattern.test(control.value.toUpperCase());
      
      return isValid ? null : { 
        invalidPAN: { 
          value: control.value,
          message: 'Enter a valid PAN number (e.g., AAAPL1234C)' 
        }
      };
    };
  }

  /**
   * Validates Indian Aadhaar numbers
   */
  static aadhaarValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.value) return null;
      
      const aadhaarNumber = control.value.replace(/\s+/g, '');
      
      // Must be 12 digits
      if (!/^\d{12}$/.test(aadhaarNumber)) {
        return { 
          invalidAadhaar: { 
            value: control.value,
            message: 'Aadhaar number must be 12 digits' 
          }
        };
      }
      
      // Validate using Verhoeff algorithm (simplified check)
      if (!this.verifyAadhaarChecksum(aadhaarNumber)) {
        return { 
          invalidAadhaar: { 
            value: control.value,
            message: 'Invalid Aadhaar number checksum' 
          }
        };
      }
      
      return null;
    };
  }

  /**
   * Validates Indian postal codes (PIN codes)
   */
  static indianPinCodeValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.value) return null;
      
      const pinPattern = /^[1-9][0-9]{5}$/;
      const isValid = pinPattern.test(control.value);
      
      return isValid ? null : { 
        invalidPinCode: { 
          value: control.value,
          message: 'Enter a valid 6-digit PIN code (e.g., 110001)' 
        }
      };
    };
  }

  /**
   * Validates company names to ensure they look legitimate
   */
  static companyNameValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.value) return null;
      
      const name = control.value.trim();
      
      // Must be at least 2 characters
      if (name.length < 2) {
        return { 
          invalidCompanyName: { 
            value: control.value,
            message: 'Company name must be at least 2 characters long' 
          }
        };
      }
      
      // Should not contain only numbers or special characters
      if (!/[a-zA-Z]/.test(name)) {
        return { 
          invalidCompanyName: { 
            value: control.value,
            message: 'Company name must contain letters' 
          }
        };
      }
      
      // Check for suspicious patterns
      const suspiciousPatterns = [
        /test/i, /dummy/i, /sample/i, /example/i, /fake/i
      ];
      
      if (suspiciousPatterns.some(pattern => pattern.test(name))) {
        return { 
          suspiciousCompanyName: { 
            value: control.value,
            message: 'Please enter a valid company name' 
          }
        };
      }
      
      return null;
    };
  }

  /**
   * Validates monetary amounts with currency considerations
   */
  static monetaryAmountValidator(minAmount: number = 0, maxAmount: number = 10000000): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.value && control.value !== 0) return null;
      
      const amount = parseFloat(control.value);
      
      if (isNaN(amount)) {
        return { 
          invalidAmount: { 
            value: control.value,
            message: 'Enter a valid amount' 
          }
        };
      }
      
      if (amount < minAmount) {
        return { 
          amountTooLow: { 
            value: control.value,
            message: `Amount must be at least ₹${minAmount.toLocaleString('en-IN')}` 
          }
        };
      }
      
      if (amount > maxAmount) {
        return { 
          amountTooHigh: { 
            value: control.value,
            message: `Amount cannot exceed ₹${maxAmount.toLocaleString('en-IN')}` 
          }
        };
      }
      
      return null;
    };
  }

  /**
   * Validates lead stage transitions
   */
  static stageTransitionValidator(currentStage: string, validTransitions: string[]): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.value) return null;
      
      if (!validTransitions.includes(control.value)) {
        return { 
          invalidStageTransition: { 
            value: control.value,
            message: `Cannot move from "${currentStage}" to "${control.value}"` 
          }
        };
      }
      
      return null;
    };
  }

  /**
   * Cross-field validator for lead value and probability
   */
  static leadValueProbabilityValidator(): ValidatorFn {
    return (formGroup: AbstractControl): ValidationErrors | null => {
      const estimatedValue = formGroup.get('estimatedValue')?.value;
      const probability = formGroup.get('probability')?.value;
      
      if (!estimatedValue || !probability) return null;
      
      // High-value leads should have realistic probability
      if (estimatedValue > 1000000 && probability > 80) {
        return { 
          unrealisticProbability: { 
            message: 'High-value leads typically have lower probability. Please review.' 
          }
        };
      }
      
      // Very low probability leads with high value need justification
      if (estimatedValue > 500000 && probability < 20) {
        return { 
          lowProbabilityHighValue: { 
            message: 'Low probability with high value requires additional justification.' 
          }
        };
      }
      
      return null;
    };
  }

  /**
   * Validates date ranges for lead timelines
   */
  static dateRangeValidator(startDateField: string, endDateField: string): ValidatorFn {
    return (formGroup: AbstractControl): ValidationErrors | null => {
      const startDate = formGroup.get(startDateField)?.value;
      const endDate = formGroup.get(endDateField)?.value;
      
      if (!startDate || !endDate) return null;
      
      const start = new Date(startDate);
      const end = new Date(endDate);
      
      if (start > end) {
        return { 
          invalidDateRange: { 
            message: 'End date must be after start date' 
          }
        };
      }
      
      // Check if the timeline is realistic (not too short or too long)
      const daysDiff = Math.ceil((end.getTime() - start.getTime()) / (1000 * 3600 * 24));
      
      if (daysDiff < 1) {
        return { 
          timelineTooShort: { 
            message: 'Lead timeline must be at least 1 day' 
          }
        };
      }
      
      if (daysDiff > 365) {
        return { 
          timelineTooLong: { 
            message: 'Lead timeline cannot exceed 1 year' 
          }
        };
      }
      
      return null;
    };
  }

  /**
   * Validates service requirements based on company type and industry
   */
  static serviceRequirementsValidator(companyType: string, industry: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.value || !Array.isArray(control.value)) return null;
      
      const services = control.value;
      
      // Must select at least one service
      if (services.length === 0) {
        return { 
          noServicesSelected: { 
            message: 'Please select at least one service requirement' 
          }
        };
      }
      
      // Industry-specific validation
      if (industry === 'manufacturing' && !services.some((s: any) => s.category === 'logistics')) {
        return { 
          missingLogisticsService: { 
            message: 'Manufacturing companies typically require logistics services' 
          }
        };
      }
      
      return null;
    };
  }

  /**
   * Simplified Aadhaar checksum validation
   */
  private static verifyAadhaarChecksum(aadhaarNumber: string): boolean {
    // This is a simplified version. In production, use the full Verhoeff algorithm
    const digits = aadhaarNumber.split('').map(Number);
    let sum = 0;
    
    for (let i = 0; i < 11; i++) {
      sum += digits[i] * (i + 1);
    }
    
    const remainder = sum % 11;
    const checkDigit = remainder < 2 ? remainder : 11 - remainder;
    
    return checkDigit === digits[11];
  }

  /**
   * Get validation error message for display
   */
  static getErrorMessage(error: any): string {
    if (error.message) return error.message;
    
    // Default messages for different error types
    const errorMessages: { [key: string]: string } = {
      required: 'This field is required',
      email: 'Please enter a valid email address',
      minlength: 'Minimum length not met',
      maxlength: 'Maximum length exceeded',
      pattern: 'Invalid format',
      min: 'Value too low',
      max: 'Value too high'
    };
    
    const errorKey = Object.keys(error)[0];
    return errorMessages[errorKey] || 'Invalid value';
  }

  /**
   * Validate all controls in a form group and return error summary
   */
  static validateFormGroup(formGroup: AbstractControl): { [key: string]: string[] } {
    const errors: { [key: string]: string[] } = {};
    
    if (formGroup instanceof FormGroup) {
      Object.keys(formGroup.controls).forEach(key => {
        const control = formGroup.get(key);
        if (control && control.errors) {
          errors[key] = Object.keys(control.errors).map(errorKey => 
            this.getErrorMessage(control.errors![errorKey])
          );
        }
      });
    }
    
    return errors;
  }
}

// Import FormGroup for type checking
import { FormGroup } from '@angular/forms';
