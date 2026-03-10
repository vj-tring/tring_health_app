/**
 * Navigation Service for handling navigation from anywhere in the app
 * This service allows navigation from components that don't have direct access to navigation props
 */

import {navigationRef} from '../navigation/utils';
import screenNames from '../navigation/screenNames';

export const NavigationService = {
  navigate: (name: string, params?: any) => {
    if (navigationRef.isReady()) {
      try {
        navigationRef.navigate(name as any, params);
      } catch (error) {
        console.error('Navigation error:', error);
      }
    } else {
      console.warn('Navigation ref is not ready yet, queuing navigation');
      // Queue the navigation for when it becomes ready
      const checkReady = () => {
        if (navigationRef.isReady()) {
          try {
            navigationRef.navigate(name as any, params);
          } catch (error) {
            console.error('Queued navigation error:', error);
          }
        } else {
          setTimeout(checkReady, 100);
        }
      };
      checkReady();
    }
  },

  goBack: () => {
    if (navigationRef.isReady() && navigationRef.canGoBack()) {
      try {
        navigationRef.goBack();
      } catch (error) {
        console.error('Go back error:', error);
      }
    } else {
      console.warn('Cannot go back - navigation not ready or no history');
    }
  },

  reset: (name: string, params?: any) => {
    if (navigationRef.isReady()) {
      try {
        navigationRef.reset({
          index: 0,
          routes: [{name: name as any, params}],
        });
      } catch (error) {
        console.error('Navigation reset error:', error);
      }
    } else {
      console.warn('Navigation ref not ready for reset');
    }
  },

  // Specific navigation methods for common screens
  navigateToWorkOrderDetails: (
    workOrderCode: string, // Accept work order code string
    dateFormat?: string,
    notificationData?: any, // Accept full notification data
    navType?: string,
  ) => {
    NavigationService.navigate(screenNames.WORK_ORDER_DETAILS, {
      workOrder: workOrderCode, // Pass the work order code
      dateFormat,
      notificationData, // Pass the full notification data
      type: navType, // Pass navType as 'type' to match WorkOrderDetailsScreen expectations
    });
  },

  navigateToLogin: () => {
    NavigationService.navigate(screenNames.LOGIN_SCREEN);
  },

  navigateToHome: () => {
    NavigationService.navigate(screenNames.HOME_SCREEN);
  },

  isReady: () => {
    return navigationRef.isReady();
  },
};

export default NavigationService;
