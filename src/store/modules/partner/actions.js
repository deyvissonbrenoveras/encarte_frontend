export function addPartnerRequest(partner) {
  return {
    type: '@partner/ADD_REQUEST',
    payload: partner,
  };
}

export function updatePartnerRequest(id, partner, removeStores, addStores) {
  return {
    type: '@partner/UPDATE_REQUEST',
    payload: { id, partner, removeStores, addStores },
  };
}
export function partnerFailure() {
  return {
    type: '@partner/FAILURE',
  };
}
