import type * as types from './types';
import type { ConfigOptions, FetchResponse } from 'api/dist/core'
import Oas from 'oas';
import APICore from 'api/dist/core';
import definition from './openapi.json';

class SDK {
  spec: Oas;
  core: APICore;

  constructor() {
    this.spec = Oas.init(definition);
    this.core = new APICore(this.spec, 'doubletick/2.0 (api/6.1.2)');
  }

  /**
   * Optionally configure various options that the SDK allows.
   *
   * @param config Object of supported SDK options and toggles.
   * @param config.timeout Override the default `fetch` request timeout of 30 seconds. This number
   * should be represented in milliseconds.
   */
  config(config: ConfigOptions) {
    this.core.setConfig(config);
  }

  /**
   * If the API you're using requires authentication you can supply the required credentials
   * through this method and the library will magically determine how they should be used
   * within your API request.
   *
   * With the exception of OpenID and MutualTLS, it supports all forms of authentication
   * supported by the OpenAPI specification.
   *
   * @example <caption>HTTP Basic auth</caption>
   * sdk.auth('username', 'password');
   *
   * @example <caption>Bearer tokens (HTTP or OAuth 2)</caption>
   * sdk.auth('myBearerToken');
   *
   * @example <caption>API Keys</caption>
   * sdk.auth('myApiKey');
   *
   * @see {@link https://spec.openapis.org/oas/v3.0.3#fixed-fields-22}
   * @see {@link https://spec.openapis.org/oas/v3.1.0#fixed-fields-22}
   * @param values Your auth credentials for the API; can specify up to two strings or numbers.
   */
  auth(...values: string[] | number[]) {
    this.core.setAuth(...values);
    return this;
  }

  /**
   * If the API you're using offers alternate server URLs, and server variables, you can tell
   * the SDK which one to use with this method. To use it you can supply either one of the
   * server URLs that are contained within the OpenAPI definition (along with any server
   * variables), or you can pass it a fully qualified URL to use (that may or may not exist
   * within the OpenAPI definition).
   *
   * @example <caption>Server URL with server variables</caption>
   * sdk.server('https://{region}.api.example.com/{basePath}', {
   *   name: 'eu',
   *   basePath: 'v14',
   * });
   *
   * @example <caption>Fully qualified server URL</caption>
   * sdk.server('https://eu.api.example.com/v14');
   *
   * @param url Server URL
   * @param variables An object of variables to replace into the server URL.
   */
  server(url: string, variables = {}) {
    this.core.setServer(url, variables);
  }

  /**
   * Send Whatsapp Template Message
   *
   * @summary Send Whatsapp Template Message
   * @throws FetchError<400, types.OutgoingMessagesWhatsappTemplateResponse400> Incorrect payload
   * @throws FetchError<401, types.OutgoingMessagesWhatsappTemplateResponse401> Unauthorized
   */
  outgoingMessagesWhatsappTemplate(body: types.OutgoingMessagesWhatsappTemplateBodyParam): Promise<FetchResponse<number, unknown>> {
    return this.core.fetch('/whatsapp/message/template', 'post', body);
  }

  /**
   * Send Whatsapp Text Message
   *
   * @summary Send Whatsapp Text Message
   * @throws FetchError<400, types.OutgoingMessagesWhatsappTextResponse400> Incorrect payload
   * @throws FetchError<401, types.OutgoingMessagesWhatsappTextResponse401> Unauthorized
   */
  outgoingMessagesWhatsappText(body: types.OutgoingMessagesWhatsappTextBodyParam): Promise<FetchResponse<number, unknown>> {
    return this.core.fetch('/whatsapp/message/text', 'post', body);
  }

  /**
   * Send Whatsapp Video Message
   *
   * @summary Send Whatsapp Video Message
   * @throws FetchError<400, types.OutgoingMessagesWhatsappVideoResponse400> Incorrect payload
   * @throws FetchError<401, types.OutgoingMessagesWhatsappVideoResponse401> Unauthorized
   */
  outgoingMessagesWhatsappVideo(body: types.OutgoingMessagesWhatsappVideoBodyParam): Promise<FetchResponse<number, unknown>> {
    return this.core.fetch('/whatsapp/message/video', 'post', body);
  }

  /**
   * Send Whatsapp Audio Message
   *
   * @summary Send Whatsapp Audio Message
   * @throws FetchError<400, types.OutgoingMessagesWhatsappAudioResponse400> Incorrect payload
   * @throws FetchError<401, types.OutgoingMessagesWhatsappAudioResponse401> Unauthorized
   */
  outgoingMessagesWhatsappAudio(body: types.OutgoingMessagesWhatsappAudioBodyParam): Promise<FetchResponse<number, unknown>> {
    return this.core.fetch('/whatsapp/message/audio', 'post', body);
  }

  /**
   * Send Whatsapp Image Message
   *
   * @summary Send Whatsapp Image Message
   * @throws FetchError<400, types.OutgoingMessagesWhatsappImageResponse400> Incorrect payload
   * @throws FetchError<401, types.OutgoingMessagesWhatsappImageResponse401> Unauthorized
   */
  outgoingMessagesWhatsappImage(body: types.OutgoingMessagesWhatsappImageBodyParam): Promise<FetchResponse<number, unknown>> {
    return this.core.fetch('/whatsapp/message/image', 'post', body);
  }

  /**
   * Send Whatsapp Document Message
   *
   * @summary Send Whatsapp Document Message
   * @throws FetchError<400, types.OutgoingMessagesWhatsappDocumentResponse400> Incorrect payload
   * @throws FetchError<401, types.OutgoingMessagesWhatsappDocumentResponse401> Unauthorized
   */
  outgoingMessagesWhatsappDocument(body: types.OutgoingMessagesWhatsappDocumentBodyParam): Promise<FetchResponse<number, unknown>> {
    return this.core.fetch('/whatsapp/message/document', 'post', body);
  }

  /**
   * Send Whatsapp Location Message
   *
   * @summary Send Whatsapp Location Message
   * @throws FetchError<400, types.OutgoingMessagesWhatsappLocationResponse400> Incorrect payload
   * @throws FetchError<401, types.OutgoingMessagesWhatsappLocationResponse401> Unauthorized
   */
  outgoingMessagesWhatsappLocation(body: types.OutgoingMessagesWhatsappLocationBodyParam): Promise<FetchResponse<number, unknown>> {
    return this.core.fetch('/whatsapp/message/location', 'post', body);
  }

  /**
   * Send Whatsapp Interactive Button Message
   *
   * @summary Send Whatsapp Interactive Button Message
   * @throws FetchError<400, types.OutgoingMessagesWhatsappInteractiveResponse400> Incorrect payload
   * @throws FetchError<401, types.OutgoingMessagesWhatsappInteractiveResponse401> Unauthorized
   */
  outgoingMessagesWhatsappInteractive(body: types.OutgoingMessagesWhatsappInteractiveBodyParam): Promise<FetchResponse<number, unknown>> {
    return this.core.fetch('/whatsapp/message/interactive', 'post', body);
  }

  /**
   * Send Whatsapp Interactive List Message
   *
   * @summary Send Whatsapp Interactive List Message
   * @throws FetchError<400, types.OutgoingMessagesWhatsappInteractiveListResponse400> Incorrect payload
   * @throws FetchError<401, types.OutgoingMessagesWhatsappInteractiveListResponse401> Unauthorized
   */
  outgoingMessagesWhatsappInteractiveList(body: types.OutgoingMessagesWhatsappInteractiveListBodyParam): Promise<FetchResponse<number, unknown>> {
    return this.core.fetch('/whatsapp/message/interactive-list', 'post', body);
  }

  /**
   * Send a template WhatsApp message to a broadcast group. When using placeholders in your
   * message, please follow the format outlined below:
   *
   * - {{Name}}: Used to include the name of the customer.
   * - {{Phone Number}}: Used to include the phone number of the customer.
   * - {{<Custom Field Name>}}: Used to include custom fields. This will only function
   * correctly if the custom field has been set for all customers within the broadcast group.
   *
   * @summary Send Template Whatsapp Message to Broadcast Group
   */
  sendBroadcastMessage(body: types.SendBroadcastMessageBodyParam): Promise<FetchResponse<200, types.SendBroadcastMessageResponse200>> {
    return this.core.fetch('/whatsapp/message/broadcast', 'post', body);
  }

  /**
   * Create New Template
   *
   * @summary Create New Template
   * @throws FetchError<400, types.CreateTemplateResponse400> Incorrect payload
   * @throws FetchError<401, types.CreateTemplateResponse401> Unauthorized
   */
  createTemplate(body: types.CreateTemplateBodyParam): Promise<FetchResponse<201, types.CreateTemplateResponse201>> {
    return this.core.fetch('/template', 'post', body);
  }

  /**
   * Delete Template
   *
   * @summary Delete Template
   * @throws FetchError<400, types.DeleteTemplateResponse400> Incorrect payload
   * @throws FetchError<401, types.DeleteTemplateResponse401> Unauthorized
   */
  deleteTemplate(body: types.DeleteTemplateBodyParam): Promise<FetchResponse<201, types.DeleteTemplateResponse201>> {
    return this.core.fetch('/template', 'delete', body);
  }

  /**
   * Get Templates
   *
   * @summary Get Templates
   * @throws FetchError<400, types.GetTemplatesResponse400> Incorrect payload
   * @throws FetchError<401, types.GetTemplatesResponse401> Unauthorized
   */
  getTemplates(metadata?: types.GetTemplatesMetadataParam): Promise<FetchResponse<201, types.GetTemplatesResponse201>> {
    return this.core.fetch('/v2/templates', 'get', metadata);
  }

  /**
   * Get details of customer along with custom fields 
   *
   * @summary Get customer details 
   * @throws FetchError<400, types.GetCustomerDetailsResponse400> Incorrect payload
   * @throws FetchError<401, types.GetCustomerDetailsResponse401> Unauthorized
   * @throws FetchError<404, types.GetCustomerDetailsResponse404> NotFound
   */
  getCustomerDetails(metadata?: types.GetCustomerDetailsMetadataParam): Promise<FetchResponse<200, types.GetCustomerDetailsResponse200>> {
    return this.core.fetch('/customer/details', 'get', metadata);
  }

  /**
   * Assign Custom Fields and/or Tags to Customer
   *
   * @summary Assign Custom Fields and/or Tags to Customer
   * @throws FetchError<400, types.CustomerAssignTagsCustomFieldsResponse400> Incorrect payload
   * @throws FetchError<401, types.CustomerAssignTagsCustomFieldsResponse401> Unauthorized
   */
  customerAssignTagsCustomFields(body: types.CustomerAssignTagsCustomFieldsBodyParam): Promise<FetchResponse<201, types.CustomerAssignTagsCustomFieldsResponse201>> {
    return this.core.fetch('/customer/assign-tags-custom-fields', 'post', body);
  }

  /**
   * Remove Custom Fields and/or Tags from Customer
   *
   * @summary Remove Custom Fields and/or Tags from Customer
   * @throws FetchError<400, types.CustomerRemoveTagsCustomFieldsResponse400> Incorrect payload
   * @throws FetchError<401, types.CustomerRemoveTagsCustomFieldsResponse401> Unauthorized
   */
  customerRemoveTagsCustomFields(body: types.CustomerRemoveTagsCustomFieldsBodyParam): Promise<FetchResponse<201, types.CustomerRemoveTagsCustomFieldsResponse201>> {
    return this.core.fetch('/customer/remove-tags-custom-fields', 'post', body);
  }

  /**
   * Block customer using phone number 
   *
   * @summary Block a customer 
   * @throws FetchError<400, types.BlockUnblockCustomerResponse400> Incorrect payload
   * @throws FetchError<401, types.BlockUnblockCustomerResponse401> Unauthorized
   * @throws FetchError<404, types.BlockUnblockCustomerResponse404> NotFound
   */
  blockUnblockCustomer(body: types.BlockUnblockCustomerBodyParam): Promise<FetchResponse<201, types.BlockUnblockCustomerResponse201>> {
    return this.core.fetch('/customer/block', 'post', body);
  }

  /**
   * Unblock customer using phone number 
   *
   * @summary Unblock a customer 
   * @throws FetchError<400, types.UnblockUnblockCustomerResponse400> Incorrect payload
   * @throws FetchError<401, types.UnblockUnblockCustomerResponse401> Unauthorized
   * @throws FetchError<404, types.UnblockUnblockCustomerResponse404> NotFound
   */
  unblockUnblockCustomer(body: types.UnblockUnblockCustomerBodyParam): Promise<FetchResponse<201, types.UnblockUnblockCustomerResponse201>> {
    return this.core.fetch('/customer/unblock', 'post', body);
  }

  /**
   *  Assign team member to chat 
   *
   * @summary Assign team member to chat
   * @throws FetchError<400, types.AssignTeamMemberToChatResponse400> Incorrect payload
   * @throws FetchError<401, types.AssignTeamMemberToChatResponse401> Unauthorized
   * @throws FetchError<422, types.AssignTeamMemberToChatResponse422> User is not a member of the team
   */
  assignTeamMemberToChat(body: types.AssignTeamMemberToChatBodyParam): Promise<FetchResponse<number, unknown>> {
    return this.core.fetch('/team-member/assign', 'post', body);
  }

  /**
   * Unassign team member from a chat
   *
   * @summary Unssign team member from a chat
   * @throws FetchError<400, types.UnassignTeamMemberFromChatResponse400> Incorrect payload
   * @throws FetchError<401, types.UnassignTeamMemberFromChatResponse401> Unauthorized
   * @throws FetchError<422, types.UnassignTeamMemberFromChatResponse422> User is not a member of the team
   */
  unassignTeamMemberFromChat(body: types.UnassignTeamMemberFromChatBodyParam): Promise<FetchResponse<201, types.UnassignTeamMemberFromChatResponse201>> {
    return this.core.fetch('/team-member/unassign', 'post', body);
  }

  /**
   * Logout a team member
   *
   * @summary Logout a team member
   * @throws FetchError<400, types.LogoutTeamMemberResponse400> Incorrect payload
   * @throws FetchError<401, types.LogoutTeamMemberResponse401> Unauthorized
   * @throws FetchError<422, types.LogoutTeamMemberResponse422> User is not a member of the team
   */
  logoutTeamMember(body: types.LogoutTeamMemberBodyParam): Promise<FetchResponse<201, types.LogoutTeamMemberResponse201>> {
    return this.core.fetch('/team-member/logout', 'post', body);
  }

  /**
   * Check reverted on time
   *
   * @summary Check reverted on time
   * @throws FetchError<400, types.CheckRevertedOnTimeResponse400> Incorrect payload
   * @throws FetchError<401, types.CheckRevertedOnTimeResponse401> Unauthorized
   */
  checkRevertedOnTime(body: types.CheckRevertedOnTimeBodyParam): Promise<FetchResponse<201, types.CheckRevertedOnTimeResponse201>> {
    return this.core.fetch('/customer/check-reverted-on-time', 'get', body);
  }

  /**
   * Create a new group
   *
   * @summary Create a new group
   */
  createGroup(body: types.CreateGroupBodyParam): Promise<FetchResponse<201, types.CreateGroupResponse201>> {
    return this.core.fetch('/groups', 'post', body);
  }

  /**
   * Deletes multiple groups
   *
   * @summary Delete groups
   */
  deleteGroups(body: types.DeleteGroupsBodyParam): Promise<FetchResponse<number, unknown>> {
    return this.core.fetch('/groups', 'delete', body);
  }

  /**
   * Returns a list of paginated groups based on search criteria and pagination parameters
   *
   * @summary Get paginated groups
   */
  getPaginatedGroupsV2(metadata?: types.GetPaginatedGroupsV2MetadataParam): Promise<FetchResponse<200, types.GetPaginatedGroupsV2Response200>> {
    return this.core.fetch('/groups', 'get', metadata);
  }

  /**
   * Adds members to an existing group
   *
   * @summary Add members to a group
   */
  addMembersToGroup(body: types.AddMembersToGroupBodyParam): Promise<FetchResponse<200, types.AddMembersToGroupResponse200>> {
    return this.core.fetch('/groups/add-members', 'post', body);
  }

  /**
   * Get wallet balance for Org
   *
   * @summary Get wallet balance
   */
  getWalletBalanaceForOrg(): Promise<FetchResponse<200, types.GetWalletBalanaceForOrgResponse200>> {
    return this.core.fetch('/wallet/balance', 'get');
  }

  /**
   * Get Team members with their Reporting Managers
   *
   * @summary Get Team
   * @throws FetchError<401, types.GetTeamResponse401> Unauthorized
   */
  getTeam(): Promise<FetchResponse<200, types.GetTeamResponse200>> {
    return this.core.fetch('/team', 'get');
  }

  /**
   * Change reporting manager of the user
   *
   * @summary Change reporting manager
   * @throws FetchError<400, types.ChangeReportingManagerResponse400> Incorrect payload
   * @throws FetchError<401, types.ChangeReportingManagerResponse401> Unauthorized
   * @throws FetchError<422, types.ChangeReportingManagerResponse422> One or more user does not exist.
   */
  changeReportingManager(body: types.ChangeReportingManagerBodyParam): Promise<FetchResponse<200, types.ChangeReportingManagerResponse200>> {
    return this.core.fetch('/team-member/reporting-manager', 'patch', body);
  }

  /**
   * Remove team member from team
   *
   * @summary Remove team member
   * @throws FetchError<400, types.RemoveTeamMemberResponse400> Incorrect payload
   * @throws FetchError<401, types.RemoveTeamMemberResponse401> Unauthorized
   * @throws FetchError<422, types.RemoveTeamMemberResponse422> User not found
   */
  removeTeamMember(body: types.RemoveTeamMemberBodyParam): Promise<FetchResponse<200, types.RemoveTeamMemberResponse200>> {
    return this.core.fetch('/team-member', 'delete', body);
  }

  /**
   * Add member under reporting manager
   *
   * @summary Add member under reporting manager
   * @throws FetchError<400, types.AddMemberUnderReportingManagerResponse400> Incorrect payload
   * @throws FetchError<401, types.AddMemberUnderReportingManagerResponse401> Unauthorized
   * @throws FetchError<422, types.AddMemberUnderReportingManagerResponse422> Reporting manager does not exist.
   */
  addMemberUnderReportingManager(body: types.AddMemberUnderReportingManagerBodyParam): Promise<FetchResponse<200, types.AddMemberUnderReportingManagerResponse200>> {
    return this.core.fetch('/team/members', 'post', body);
  }

  /**
   * Get all roles
   *
   * @summary Get all roles
   * @throws FetchError<401, types.GetAllRolesResponse401> Unauthorized
   * @throws FetchError<422, types.GetAllRolesResponse422> Roles not found
   */
  getAllRoles(): Promise<FetchResponse<200, types.GetAllRolesResponse200>> {
    return this.core.fetch('/roles', 'get');
  }

  /**
   * Upload Media to use in messages
   *
   * @summary Upload Media
   * @throws FetchError<401, types.UploadMediaResponse401> Unauthorized
   * @throws FetchError<402, types.UploadMediaResponse402> File Size Exceeds max file size.
   * @throws FetchError<403, types.UploadMediaResponse403> File Type not supported.
   */
  uploadMedia(body?: types.UploadMediaBodyParam): Promise<FetchResponse<201, types.UploadMediaResponse201>> {
    return this.core.fetch('/media/upload', 'post', body);
  }
}

const createSDK = (() => { return new SDK(); })()
;

export default createSDK;

export type { AddMemberUnderReportingManagerBodyParam, AddMemberUnderReportingManagerResponse200, AddMemberUnderReportingManagerResponse400, AddMemberUnderReportingManagerResponse401, AddMemberUnderReportingManagerResponse422, AddMembersToGroupBodyParam, AddMembersToGroupResponse200, AssignTeamMemberToChatBodyParam, AssignTeamMemberToChatResponse400, AssignTeamMemberToChatResponse401, AssignTeamMemberToChatResponse422, BlockUnblockCustomerBodyParam, BlockUnblockCustomerResponse201, BlockUnblockCustomerResponse400, BlockUnblockCustomerResponse401, BlockUnblockCustomerResponse404, ChangeReportingManagerBodyParam, ChangeReportingManagerResponse200, ChangeReportingManagerResponse400, ChangeReportingManagerResponse401, ChangeReportingManagerResponse422, CheckRevertedOnTimeBodyParam, CheckRevertedOnTimeResponse201, CheckRevertedOnTimeResponse400, CheckRevertedOnTimeResponse401, CreateGroupBodyParam, CreateGroupResponse201, CreateTemplateBodyParam, CreateTemplateResponse201, CreateTemplateResponse400, CreateTemplateResponse401, CustomerAssignTagsCustomFieldsBodyParam, CustomerAssignTagsCustomFieldsResponse201, CustomerAssignTagsCustomFieldsResponse400, CustomerAssignTagsCustomFieldsResponse401, CustomerRemoveTagsCustomFieldsBodyParam, CustomerRemoveTagsCustomFieldsResponse201, CustomerRemoveTagsCustomFieldsResponse400, CustomerRemoveTagsCustomFieldsResponse401, DeleteGroupsBodyParam, DeleteTemplateBodyParam, DeleteTemplateResponse201, DeleteTemplateResponse400, DeleteTemplateResponse401, GetAllRolesResponse200, GetAllRolesResponse401, GetAllRolesResponse422, GetCustomerDetailsMetadataParam, GetCustomerDetailsResponse200, GetCustomerDetailsResponse400, GetCustomerDetailsResponse401, GetCustomerDetailsResponse404, GetPaginatedGroupsV2MetadataParam, GetPaginatedGroupsV2Response200, GetTeamResponse200, GetTeamResponse401, GetTemplatesMetadataParam, GetTemplatesResponse201, GetTemplatesResponse400, GetTemplatesResponse401, GetWalletBalanaceForOrgResponse200, LogoutTeamMemberBodyParam, LogoutTeamMemberResponse201, LogoutTeamMemberResponse400, LogoutTeamMemberResponse401, LogoutTeamMemberResponse422, OutgoingMessagesWhatsappAudioBodyParam, OutgoingMessagesWhatsappAudioResponse400, OutgoingMessagesWhatsappAudioResponse401, OutgoingMessagesWhatsappDocumentBodyParam, OutgoingMessagesWhatsappDocumentResponse400, OutgoingMessagesWhatsappDocumentResponse401, OutgoingMessagesWhatsappImageBodyParam, OutgoingMessagesWhatsappImageResponse400, OutgoingMessagesWhatsappImageResponse401, OutgoingMessagesWhatsappInteractiveBodyParam, OutgoingMessagesWhatsappInteractiveListBodyParam, OutgoingMessagesWhatsappInteractiveListResponse400, OutgoingMessagesWhatsappInteractiveListResponse401, OutgoingMessagesWhatsappInteractiveResponse400, OutgoingMessagesWhatsappInteractiveResponse401, OutgoingMessagesWhatsappLocationBodyParam, OutgoingMessagesWhatsappLocationResponse400, OutgoingMessagesWhatsappLocationResponse401, OutgoingMessagesWhatsappTemplateBodyParam, OutgoingMessagesWhatsappTemplateResponse400, OutgoingMessagesWhatsappTemplateResponse401, OutgoingMessagesWhatsappTextBodyParam, OutgoingMessagesWhatsappTextResponse400, OutgoingMessagesWhatsappTextResponse401, OutgoingMessagesWhatsappVideoBodyParam, OutgoingMessagesWhatsappVideoResponse400, OutgoingMessagesWhatsappVideoResponse401, RemoveTeamMemberBodyParam, RemoveTeamMemberResponse200, RemoveTeamMemberResponse400, RemoveTeamMemberResponse401, RemoveTeamMemberResponse422, SendBroadcastMessageBodyParam, SendBroadcastMessageResponse200, UnassignTeamMemberFromChatBodyParam, UnassignTeamMemberFromChatResponse201, UnassignTeamMemberFromChatResponse400, UnassignTeamMemberFromChatResponse401, UnassignTeamMemberFromChatResponse422, UnblockUnblockCustomerBodyParam, UnblockUnblockCustomerResponse201, UnblockUnblockCustomerResponse400, UnblockUnblockCustomerResponse401, UnblockUnblockCustomerResponse404, UploadMediaBodyParam, UploadMediaResponse201, UploadMediaResponse401, UploadMediaResponse402, UploadMediaResponse403 } from './types';
