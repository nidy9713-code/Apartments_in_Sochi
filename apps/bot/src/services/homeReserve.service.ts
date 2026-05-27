export class HomeReserveService {
  /**
   * Service for HomeReserve integration.
   * Currently handles external links, but designed to be extended with API calls.
   */

  async getApartmentAvailability(apartmentId: string): Promise<any> {
    // Placeholder for future API integration
    // return await fetch(`https://api.homereserve.ru/v1/apartments/${apartmentId}/availability`);
    return null;
  }

  getBookingLink(homeReserveUrl: string): string {
    return homeReserveUrl;
  }
}

export const homeReserveService = new HomeReserveService();
