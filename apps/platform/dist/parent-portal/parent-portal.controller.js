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
exports.ParentPortalController = void 0;
const common_1 = require("@nestjs/common");
const parent_portal_service_1 = require("./parent-portal.service");
const auth_guard_1 = require("../auth/auth.guard");
const roles_guard_1 = require("../auth/roles.guard");
const roles_decorator_1 = require("../auth/roles.decorator");
const auth_service_1 = require("../auth/auth.service");
const client_1 = require("@prisma/client");
const express_1 = require("express");
let ParentPortalController = class ParentPortalController {
    parentPortalService;
    authService;
    constructor(parentPortalService, authService) {
        this.parentPortalService = parentPortalService;
        this.authService = authService;
    }
    async getOverview(parentId, req) {
        await this.authService.assertParentAccess(req.user, parentId);
        return this.parentPortalService.getParentOverview(parentId);
    }
};
exports.ParentPortalController = ParentPortalController;
__decorate([
    (0, common_1.Get)(':parentId/overview'),
    (0, roles_decorator_1.Roles)(client_1.Role.PARENT, client_1.Role.ADMIN, client_1.Role.SUPERADMIN),
    __param(0, (0, common_1.Param)('parentId')),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, typeof (_a = typeof express_1.Request !== "undefined" && express_1.Request) === "function" ? _a : Object]),
    __metadata("design:returntype", Promise)
], ParentPortalController.prototype, "getOverview", null);
exports.ParentPortalController = ParentPortalController = __decorate([
    (0, common_1.Controller)('parent-portal'),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard, roles_guard_1.RolesGuard),
    __metadata("design:paramtypes", [parent_portal_service_1.ParentPortalService,
        auth_service_1.AuthService])
], ParentPortalController);
