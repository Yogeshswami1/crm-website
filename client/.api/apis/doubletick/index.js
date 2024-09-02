import Oas from 'oas';
import APICore from 'api/dist/core';
import definition from './openapi.json';
class SDK {
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
    config(config) {
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
    auth(...values) {
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
    server(url, variables = {}) {
        this.core.setServer(url, variables);
    }
    /**
     * Send Whatsapp Template Message
     *
     * @summary Send Whatsapp Template Message
     * @throws FetchError<400, types.OutgoingMessagesWhatsappTemplateResponse400> Incorrect payload
     * @throws FetchError<401, types.OutgoingMessagesWhatsappTemplateResponse401> Unauthorized
     */
    outgoingMessagesWhatsappTemplate(body) {
        return this.core.fetch('/whatsapp/message/template', 'post', body);
    }
    /**
     * Send Whatsapp Text Message
     *
     * @summary Send Whatsapp Text Message
     * @throws FetchError<400, types.OutgoingMessagesWhatsappTextResponse400> Incorrect payload
     * @throws FetchError<401, types.OutgoingMessagesWhatsappTextResponse401> Unauthorized
     */
    outgoingMessagesWhatsappText(body) {
        return this.core.fetch('/whatsapp/message/text', 'post', body);
    }
    /**
     * Send Whatsapp Video Message
     *
     * @summary Send Whatsapp Video Message
     * @throws FetchError<400, types.OutgoingMessagesWhatsappVideoResponse400> Incorrect payload
     * @throws FetchError<401, types.OutgoingMessagesWhatsappVideoResponse401> Unauthorized
     */
    outgoingMessagesWhatsappVideo(body) {
        return this.core.fetch('/whatsapp/message/video', 'post', body);
    }
    /**
     * Send Whatsapp Audio Message
     *
     * @summary Send Whatsapp Audio Message
     * @throws FetchError<400, types.OutgoingMessagesWhatsappAudioResponse400> Incorrect payload
     * @throws FetchError<401, types.OutgoingMessagesWhatsappAudioResponse401> Unauthorized
     */
    outgoingMessagesWhatsappAudio(body) {
        return this.core.fetch('/whatsapp/message/audio', 'post', body);
    }
    /**
     * Send Whatsapp Image Message
     *
     * @summary Send Whatsapp Image Message
     * @throws FetchError<400, types.OutgoingMessagesWhatsappImageResponse400> Incorrect payload
     * @throws FetchError<401, types.OutgoingMessagesWhatsappImageResponse401> Unauthorized
     */
    outgoingMessagesWhatsappImage(body) {
        return this.core.fetch('/whatsapp/message/image', 'post', body);
    }
    /**
     * Send Whatsapp Document Message
     *
     * @summary Send Whatsapp Document Message
     * @throws FetchError<400, types.OutgoingMessagesWhatsappDocumentResponse400> Incorrect payload
     * @throws FetchError<401, types.OutgoingMessagesWhatsappDocumentResponse401> Unauthorized
     */
    outgoingMessagesWhatsappDocument(body) {
        return this.core.fetch('/whatsapp/message/document', 'post', body);
    }
    /**
     * Send Whatsapp Location Message
     *
     * @summary Send Whatsapp Location Message
     * @throws FetchError<400, types.OutgoingMessagesWhatsappLocationResponse400> Incorrect payload
     * @throws FetchError<401, types.OutgoingMessagesWhatsappLocationResponse401> Unauthorized
     */
    outgoingMessagesWhatsappLocation(body) {
        return this.core.fetch('/whatsapp/message/location', 'post', body);
    }
    /**
     * Send Whatsapp Interactive Button Message
     *
     * @summary Send Whatsapp Interactive Button Message
     * @throws FetchError<400, types.OutgoingMessagesWhatsappInteractiveResponse400> Incorrect payload
     * @throws FetchError<401, types.OutgoingMessagesWhatsappInteractiveResponse401> Unauthorized
     */
    outgoingMessagesWhatsappInteractive(body) {
        return this.core.fetch('/whatsapp/message/interactive', 'post', body);
    }
    /**
     * Send Whatsapp Interactive List Message
     *
     * @summary Send Whatsapp Interactive List Message
     * @throws FetchError<400, types.OutgoingMessagesWhatsappInteractiveListResponse400> Incorrect payload
     * @throws FetchError<401, types.OutgoingMessagesWhatsappInteractiveListResponse401> Unauthorized
     */
    outgoingMessagesWhatsappInteractiveList(body) {
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
    sendBroadcastMessage(body) {
        return this.core.fetch('/whatsapp/message/broadcast', 'post', body);
    }
    /**
     * Create New Template
     *
     * @summary Create New Template
     * @throws FetchError<400, types.CreateTemplateResponse400> Incorrect payload
     * @throws FetchError<401, types.CreateTemplateResponse401> Unauthorized
     */
    createTemplate(body) {
        return this.core.fetch('/template', 'post', body);
    }
    /**
     * Delete Template
     *
     * @summary Delete Template
     * @throws FetchError<400, types.DeleteTemplateResponse400> Incorrect payload
     * @throws FetchError<401, types.DeleteTemplateResponse401> Unauthorized
     */
    deleteTemplate(body) {
        return this.core.fetch('/template', 'delete', body);
    }
    /**
     * Get Templates
     *
     * @summary Get Templates
     * @throws FetchError<400, types.GetTemplatesResponse400> Incorrect payload
     * @throws FetchError<401, types.GetTemplatesResponse401> Unauthorized
     */
    getTemplates(metadata) {
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
    getCustomerDetails(metadata) {
        return this.core.fetch('/customer/details', 'get', metadata);
    }
    /**
     * Assign Custom Fields and/or Tags to Customer
     *
     * @summary Assign Custom Fields and/or Tags to Customer
     * @throws FetchError<400, types.CustomerAssignTagsCustomFieldsResponse400> Incorrect payload
     * @throws FetchError<401, types.CustomerAssignTagsCustomFieldsResponse401> Unauthorized
     */
    customerAssignTagsCustomFields(body) {
        return this.core.fetch('/customer/assign-tags-custom-fields', 'post', body);
    }
    /**
     * Remove Custom Fields and/or Tags from Customer
     *
     * @summary Remove Custom Fields and/or Tags from Customer
     * @throws FetchError<400, types.CustomerRemoveTagsCustomFieldsResponse400> Incorrect payload
     * @throws FetchError<401, types.CustomerRemoveTagsCustomFieldsResponse401> Unauthorized
     */
    customerRemoveTagsCustomFields(body) {
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
    blockUnblockCustomer(body) {
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
    unblockUnblockCustomer(body) {
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
    assignTeamMemberToChat(body) {
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
    unassignTeamMemberFromChat(body) {
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
    logoutTeamMember(body) {
        return this.core.fetch('/team-member/logout', 'post', body);
    }
    /**
     * Check reverted on time
     *
     * @summary Check reverted on time
     * @throws FetchError<400, types.CheckRevertedOnTimeResponse400> Incorrect payload
     * @throws FetchError<401, types.CheckRevertedOnTimeResponse401> Unauthorized
     */
    checkRevertedOnTime(body) {
        return this.core.fetch('/customer/check-reverted-on-time', 'get', body);
    }
    /**
     * Create a new group
     *
     * @summary Create a new group
     */
    createGroup(body) {
        return this.core.fetch('/groups', 'post', body);
    }
    /**
     * Deletes multiple groups
     *
     * @summary Delete groups
     */
    deleteGroups(body) {
        return this.core.fetch('/groups', 'delete', body);
    }
    /**
     * Returns a list of paginated groups based on search criteria and pagination parameters
     *
     * @summary Get paginated groups
     */
    getPaginatedGroupsV2(metadata) {
        return this.core.fetch('/groups', 'get', metadata);
    }
    /**
     * Adds members to an existing group
     *
     * @summary Add members to a group
     */
    addMembersToGroup(body) {
        return this.core.fetch('/groups/add-members', 'post', body);
    }
    /**
     * Get wallet balance for Org
     *
     * @summary Get wallet balance
     */
    getWalletBalanaceForOrg() {
        return this.core.fetch('/wallet/balance', 'get');
    }
    /**
     * Get Team members with their Reporting Managers
     *
     * @summary Get Team
     * @throws FetchError<401, types.GetTeamResponse401> Unauthorized
     */
    getTeam() {
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
    changeReportingManager(body) {
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
    removeTeamMember(body) {
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
    addMemberUnderReportingManager(body) {
        return this.core.fetch('/team/members', 'post', body);
    }
    /**
     * Get all roles
     *
     * @summary Get all roles
     * @throws FetchError<401, types.GetAllRolesResponse401> Unauthorized
     * @throws FetchError<422, types.GetAllRolesResponse422> Roles not found
     */
    getAllRoles() {
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
    uploadMedia(body) {
        return this.core.fetch('/media/upload', 'post', body);
    }
}
const createSDK = (() => { return new SDK(); })();
export default createSDK;
