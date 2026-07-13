"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.MentorPortalController = void 0;
const common_1 = require("@nestjs/common");
const mentor_portal_service_1 = require("./mentor-portal.service");
const auth_guard_1 = require("../auth/auth.guard");
const roles_guard_1 = require("../auth/roles.guard");
const roles_decorator_1 = require("../auth/roles.decorator");
const auth_service_1 = require("../auth/auth.service");
const client_1 = require("@prisma/client");
const express_1 = require("express");
let MentorPortalController = class MentorPortalController {
    mentorPortalService;
    authService;
    constructor(mentorPortalService, authService) {
        this.mentorPortalService = mentorPortalService;
        this.authService = authService;
    }
    async getOverview(mentorId, req) {
        await this.authService.assertMentorAccess(req.user, mentorId);
        return this.mentorPortalService.getMentorOverview(mentorId);
    }
};
exports.MentorPortalController = MentorPortalController;
__decorate([
    (0, common_1.Get)(':mentorId/overview'),
    (0, roles_decorator_1.Roles)(client_1.Role.MENTOR, client_1.Role.ADMIN, client_1.Role.SUPERADMIN),
    __param(0, (0, common_1.Param)('mentorId')),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, typeof (_a = typeof express_1.Request !== "undefined" && express_1.Request) === "function" ? _a : Object]),
    __metadata("design:returntype", Promise)
], MentorPortalController.prototype, "getOverview", null);
exports.MentorPortalController = MentorPortalController = __decorate([
    (0, common_1.Controller)('mentor-portal'),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard, roles_guard_1.RolesGuard),
    __metadata("design:paramtypes", [mentor_portal_service_1.MentorPortalService,
        auth_service_1.AuthService])
], MentorPortalController);
