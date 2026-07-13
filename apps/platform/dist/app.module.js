"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const throttler_1 = require("@nestjs/throttler");
const app_controller_1 = require("./app.controller");
const prisma_module_1 = require("./prisma/prisma.module");
const student_portal_module_1 = require("./student-portal/student-portal.module");
const assessments_module_1 = require("./assessments/assessments.module");
const goals_module_1 = require("./goals/goals.module");
const sessions_module_1 = require("./sessions/sessions.module");
const auth_module_1 = require("./auth/auth.module");
const parent_portal_module_1 = require("./parent-portal/parent-portal.module");
const mentor_portal_module_1 = require("./mentor-portal/mentor-portal.module");
const cms_module_1 = require("./cms/cms.module");
let AppModule = class AppModule {
    configure(consumer) {
        // Shared global custom middleware logging logic can be set up here
    }
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            throttler_1.ThrottlerModule.forRoot([{ ttl: 60000, limit: 100 }]),
            prisma_module_1.PrismaModule,
            student_portal_module_1.StudentPortalModule,
            assessments_module_1.AssessmentsModule,
            goals_module_1.GoalsModule,
            sessions_module_1.SessionsModule,
            auth_module_1.AuthModule,
            parent_portal_module_1.ParentPortalModule,
            mentor_portal_module_1.MentorPortalModule,
            cms_module_1.CmsModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [{ provide: core_1.APP_GUARD, useClass: throttler_1.ThrottlerGuard }],
    })
], AppModule);
