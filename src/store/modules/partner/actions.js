export function addPartnerRequest(partner) {
  return {
    type: '@partner/ADD_REQUEST',
    payload: partner,
  };
}
export function partnerFailure() {
  return {
    type: '@partner/FAILURE',
  };
}
