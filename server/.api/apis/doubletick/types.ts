import type { FromSchema } from 'json-schema-to-ts';
import * as schemas from './schemas';

export type AddMemberUnderReportingManagerBodyParam = FromSchema<typeof schemas.AddMemberUnderReportingManager.body>;
export type AddMemberUnderReportingManagerResponse200 = FromSchema<typeof schemas.AddMemberUnderReportingManager.response['200']>;
export type AddMemberUnderReportingManagerResponse400 = FromSchema<typeof schemas.AddMemberUnderReportingManager.response['400']>;
export type AddMemberUnderReportingManagerResponse401 = FromSchema<typeof schemas.AddMemberUnderReportingManager.response['401']>;
export type AddMemberUnderReportingManagerResponse422 = FromSchema<typeof schemas.AddMemberUnderReportingManager.response['422']>;
export type AddMembersToGroupBodyParam = FromSchema<typeof schemas.AddMembersToGroup.body>;
export type AddMembersToGroupResponse200 = FromSchema<typeof schemas.AddMembersToGroup.response['200']>;
export type AssignTeamMemberToChatBodyParam = FromSchema<typeof schemas.AssignTeamMemberToChat.body>;
export type AssignTeamMemberToChatResponse400 = FromSchema<typeof schemas.AssignTeamMemberToChat.response['400']>;
export type AssignTeamMemberToChatResponse401 = FromSchema<typeof schemas.AssignTeamMemberToChat.response['401']>;
export type AssignTeamMemberToChatResponse422 = FromSchema<typeof schemas.AssignTeamMemberToChat.response['422']>;
export type BlockUnblockCustomerBodyParam = FromSchema<typeof schemas.BlockUnblockCustomer.body>;
export type BlockUnblockCustomerResponse201 = FromSchema<typeof schemas.BlockUnblockCustomer.response['201']>;
export type BlockUnblockCustomerResponse400 = FromSchema<typeof schemas.BlockUnblockCustomer.response['400']>;
export type BlockUnblockCustomerResponse401 = FromSchema<typeof schemas.BlockUnblockCustomer.response['401']>;
export type BlockUnblockCustomerResponse404 = FromSchema<typeof schemas.BlockUnblockCustomer.response['404']>;
export type ChangeReportingManagerBodyParam = FromSchema<typeof schemas.ChangeReportingManager.body>;
export type ChangeReportingManagerResponse200 = FromSchema<typeof schemas.ChangeReportingManager.response['200']>;
export type ChangeReportingManagerResponse400 = FromSchema<typeof schemas.ChangeReportingManager.response['400']>;
export type ChangeReportingManagerResponse401 = FromSchema<typeof schemas.ChangeReportingManager.response['401']>;
export type ChangeReportingManagerResponse422 = FromSchema<typeof schemas.ChangeReportingManager.response['422']>;
export type CheckRevertedOnTimeBodyParam = FromSchema<typeof schemas.CheckRevertedOnTime.body>;
export type CheckRevertedOnTimeResponse201 = FromSchema<typeof schemas.CheckRevertedOnTime.response['201']>;
export type CheckRevertedOnTimeResponse400 = FromSchema<typeof schemas.CheckRevertedOnTime.response['400']>;
export type CheckRevertedOnTimeResponse401 = FromSchema<typeof schemas.CheckRevertedOnTime.response['401']>;
export type CreateGroupBodyParam = FromSchema<typeof schemas.CreateGroup.body>;
export type CreateGroupResponse201 = FromSchema<typeof schemas.CreateGroup.response['201']>;
export type CreateTemplateBodyParam = FromSchema<typeof schemas.CreateTemplate.body>;
export type CreateTemplateResponse201 = FromSchema<typeof schemas.CreateTemplate.response['201']>;
export type CreateTemplateResponse400 = FromSchema<typeof schemas.CreateTemplate.response['400']>;
export type CreateTemplateResponse401 = FromSchema<typeof schemas.CreateTemplate.response['401']>;
export type CustomerAssignTagsCustomFieldsBodyParam = FromSchema<typeof schemas.CustomerAssignTagsCustomFields.body>;
export type CustomerAssignTagsCustomFieldsResponse201 = FromSchema<typeof schemas.CustomerAssignTagsCustomFields.response['201']>;
export type CustomerAssignTagsCustomFieldsResponse400 = FromSchema<typeof schemas.CustomerAssignTagsCustomFields.response['400']>;
export type CustomerAssignTagsCustomFieldsResponse401 = FromSchema<typeof schemas.CustomerAssignTagsCustomFields.response['401']>;
export type CustomerRemoveTagsCustomFieldsBodyParam = FromSchema<typeof schemas.CustomerRemoveTagsCustomFields.body>;
export type CustomerRemoveTagsCustomFieldsResponse201 = FromSchema<typeof schemas.CustomerRemoveTagsCustomFields.response['201']>;
export type CustomerRemoveTagsCustomFieldsResponse400 = FromSchema<typeof schemas.CustomerRemoveTagsCustomFields.response['400']>;
export type CustomerRemoveTagsCustomFieldsResponse401 = FromSchema<typeof schemas.CustomerRemoveTagsCustomFields.response['401']>;
export type DeleteGroupsBodyParam = FromSchema<typeof schemas.DeleteGroups.body>;
export type DeleteTemplateBodyParam = FromSchema<typeof schemas.DeleteTemplate.body>;
export type DeleteTemplateResponse201 = FromSchema<typeof schemas.DeleteTemplate.response['201']>;
export type DeleteTemplateResponse400 = FromSchema<typeof schemas.DeleteTemplate.response['400']>;
export type DeleteTemplateResponse401 = FromSchema<typeof schemas.DeleteTemplate.response['401']>;
export type GetAllRolesResponse200 = FromSchema<typeof schemas.GetAllRoles.response['200']>;
export type GetAllRolesResponse401 = FromSchema<typeof schemas.GetAllRoles.response['401']>;
export type GetAllRolesResponse422 = FromSchema<typeof schemas.GetAllRoles.response['422']>;
export type GetCustomerDetailsMetadataParam = FromSchema<typeof schemas.GetCustomerDetails.metadata>;
export type GetCustomerDetailsResponse200 = FromSchema<typeof schemas.GetCustomerDetails.response['200']>;
export type GetCustomerDetailsResponse400 = FromSchema<typeof schemas.GetCustomerDetails.response['400']>;
export type GetCustomerDetailsResponse401 = FromSchema<typeof schemas.GetCustomerDetails.response['401']>;
export type GetCustomerDetailsResponse404 = FromSchema<typeof schemas.GetCustomerDetails.response['404']>;
export type GetPaginatedGroupsV2MetadataParam = FromSchema<typeof schemas.GetPaginatedGroupsV2.metadata>;
export type GetPaginatedGroupsV2Response200 = FromSchema<typeof schemas.GetPaginatedGroupsV2.response['200']>;
export type GetTeamResponse200 = FromSchema<typeof schemas.GetTeam.response['200']>;
export type GetTeamResponse401 = FromSchema<typeof schemas.GetTeam.response['401']>;
export type GetTemplatesMetadataParam = FromSchema<typeof schemas.GetTemplates.metadata>;
export type GetTemplatesResponse201 = FromSchema<typeof schemas.GetTemplates.response['201']>;
export type GetTemplatesResponse400 = FromSchema<typeof schemas.GetTemplates.response['400']>;
export type GetTemplatesResponse401 = FromSchema<typeof schemas.GetTemplates.response['401']>;
export type GetWalletBalanaceForOrgResponse200 = FromSchema<typeof schemas.GetWalletBalanaceForOrg.response['200']>;
export type LogoutTeamMemberBodyParam = FromSchema<typeof schemas.LogoutTeamMember.body>;
export type LogoutTeamMemberResponse201 = FromSchema<typeof schemas.LogoutTeamMember.response['201']>;
export type LogoutTeamMemberResponse400 = FromSchema<typeof schemas.LogoutTeamMember.response['400']>;
export type LogoutTeamMemberResponse401 = FromSchema<typeof schemas.LogoutTeamMember.response['401']>;
export type LogoutTeamMemberResponse422 = FromSchema<typeof schemas.LogoutTeamMember.response['422']>;
export type OutgoingMessagesWhatsappAudioBodyParam = FromSchema<typeof schemas.OutgoingMessagesWhatsappAudio.body>;
export type OutgoingMessagesWhatsappAudioResponse400 = FromSchema<typeof schemas.OutgoingMessagesWhatsappAudio.response['400']>;
export type OutgoingMessagesWhatsappAudioResponse401 = FromSchema<typeof schemas.OutgoingMessagesWhatsappAudio.response['401']>;
export type OutgoingMessagesWhatsappDocumentBodyParam = FromSchema<typeof schemas.OutgoingMessagesWhatsappDocument.body>;
export type OutgoingMessagesWhatsappDocumentResponse400 = FromSchema<typeof schemas.OutgoingMessagesWhatsappDocument.response['400']>;
export type OutgoingMessagesWhatsappDocumentResponse401 = FromSchema<typeof schemas.OutgoingMessagesWhatsappDocument.response['401']>;
export type OutgoingMessagesWhatsappImageBodyParam = FromSchema<typeof schemas.OutgoingMessagesWhatsappImage.body>;
export type OutgoingMessagesWhatsappImageResponse400 = FromSchema<typeof schemas.OutgoingMessagesWhatsappImage.response['400']>;
export type OutgoingMessagesWhatsappImageResponse401 = FromSchema<typeof schemas.OutgoingMessagesWhatsappImage.response['401']>;
export type OutgoingMessagesWhatsappInteractiveBodyParam = FromSchema<typeof schemas.OutgoingMessagesWhatsappInteractive.body>;
export type OutgoingMessagesWhatsappInteractiveListBodyParam = FromSchema<typeof schemas.OutgoingMessagesWhatsappInteractiveList.body>;
export type OutgoingMessagesWhatsappInteractiveListResponse400 = FromSchema<typeof schemas.OutgoingMessagesWhatsappInteractiveList.response['400']>;
export type OutgoingMessagesWhatsappInteractiveListResponse401 = FromSchema<typeof schemas.OutgoingMessagesWhatsappInteractiveList.response['401']>;
export type OutgoingMessagesWhatsappInteractiveResponse400 = FromSchema<typeof schemas.OutgoingMessagesWhatsappInteractive.response['400']>;
export type OutgoingMessagesWhatsappInteractiveResponse401 = FromSchema<typeof schemas.OutgoingMessagesWhatsappInteractive.response['401']>;
export type OutgoingMessagesWhatsappLocationBodyParam = FromSchema<typeof schemas.OutgoingMessagesWhatsappLocation.body>;
export type OutgoingMessagesWhatsappLocationResponse400 = FromSchema<typeof schemas.OutgoingMessagesWhatsappLocation.response['400']>;
export type OutgoingMessagesWhatsappLocationResponse401 = FromSchema<typeof schemas.OutgoingMessagesWhatsappLocation.response['401']>;
export type OutgoingMessagesWhatsappTemplateBodyParam = FromSchema<typeof schemas.OutgoingMessagesWhatsappTemplate.body>;
export type OutgoingMessagesWhatsappTemplateResponse400 = FromSchema<typeof schemas.OutgoingMessagesWhatsappTemplate.response['400']>;
export type OutgoingMessagesWhatsappTemplateResponse401 = FromSchema<typeof schemas.OutgoingMessagesWhatsappTemplate.response['401']>;
export type OutgoingMessagesWhatsappTextBodyParam = FromSchema<typeof schemas.OutgoingMessagesWhatsappText.body>;
export type OutgoingMessagesWhatsappTextResponse400 = FromSchema<typeof schemas.OutgoingMessagesWhatsappText.response['400']>;
export type OutgoingMessagesWhatsappTextResponse401 = FromSchema<typeof schemas.OutgoingMessagesWhatsappText.response['401']>;
export type OutgoingMessagesWhatsappVideoBodyParam = FromSchema<typeof schemas.OutgoingMessagesWhatsappVideo.body>;
export type OutgoingMessagesWhatsappVideoResponse400 = FromSchema<typeof schemas.OutgoingMessagesWhatsappVideo.response['400']>;
export type OutgoingMessagesWhatsappVideoResponse401 = FromSchema<typeof schemas.OutgoingMessagesWhatsappVideo.response['401']>;
export type RemoveTeamMemberBodyParam = FromSchema<typeof schemas.RemoveTeamMember.body>;
export type RemoveTeamMemberResponse200 = FromSchema<typeof schemas.RemoveTeamMember.response['200']>;
export type RemoveTeamMemberResponse400 = FromSchema<typeof schemas.RemoveTeamMember.response['400']>;
export type RemoveTeamMemberResponse401 = FromSchema<typeof schemas.RemoveTeamMember.response['401']>;
export type RemoveTeamMemberResponse422 = FromSchema<typeof schemas.RemoveTeamMember.response['422']>;
export type SendBroadcastMessageBodyParam = FromSchema<typeof schemas.SendBroadcastMessage.body>;
export type SendBroadcastMessageResponse200 = FromSchema<typeof schemas.SendBroadcastMessage.response['200']>;
export type UnassignTeamMemberFromChatBodyParam = FromSchema<typeof schemas.UnassignTeamMemberFromChat.body>;
export type UnassignTeamMemberFromChatResponse201 = FromSchema<typeof schemas.UnassignTeamMemberFromChat.response['201']>;
export type UnassignTeamMemberFromChatResponse400 = FromSchema<typeof schemas.UnassignTeamMemberFromChat.response['400']>;
export type UnassignTeamMemberFromChatResponse401 = FromSchema<typeof schemas.UnassignTeamMemberFromChat.response['401']>;
export type UnassignTeamMemberFromChatResponse422 = FromSchema<typeof schemas.UnassignTeamMemberFromChat.response['422']>;
export type UnblockUnblockCustomerBodyParam = FromSchema<typeof schemas.UnblockUnblockCustomer.body>;
export type UnblockUnblockCustomerResponse201 = FromSchema<typeof schemas.UnblockUnblockCustomer.response['201']>;
export type UnblockUnblockCustomerResponse400 = FromSchema<typeof schemas.UnblockUnblockCustomer.response['400']>;
export type UnblockUnblockCustomerResponse401 = FromSchema<typeof schemas.UnblockUnblockCustomer.response['401']>;
export type UnblockUnblockCustomerResponse404 = FromSchema<typeof schemas.UnblockUnblockCustomer.response['404']>;
export type UploadMediaBodyParam = FromSchema<typeof schemas.UploadMedia.body>;
export type UploadMediaResponse201 = FromSchema<typeof schemas.UploadMedia.response['201']>;
export type UploadMediaResponse401 = FromSchema<typeof schemas.UploadMedia.response['401']>;
export type UploadMediaResponse402 = FromSchema<typeof schemas.UploadMedia.response['402']>;
export type UploadMediaResponse403 = FromSchema<typeof schemas.UploadMedia.response['403']>;
