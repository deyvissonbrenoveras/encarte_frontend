export function addPartnerRequest(partner, successCb) {
  return {
    type: '@partner/ADD_REQUEST',
    payload: partner,
    successCb,
  };
}
export function loadPartnerRequest(id) {
  return {
    type: '@partner/LOAD_REQUEST',
    payload: { id },
  };
}
export function loadSuccess(payload) {
  return {
    type: '@partner/LOAD_SUCCESS',
    payload,
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
export function disassociateProductsFromPartner(
  partnerId,
  products,
  successCb
) {
  return {
    type: '@partner/DISASSOCIATE_PRODUCTS_REQUEST',
    payload: { partnerId, products, successCb },
  };
}
