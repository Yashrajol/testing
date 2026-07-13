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
Object.defineProperty(exports, "__esModule", { value: true });
exports.CmsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let CmsService = class CmsService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getPageLayout(slug) {
        const page = await this.prisma.cmsPage.findUnique({
            where: { slug },
            include: { sections: true },
        });
        if (!page) {
            return {};
        }
        const layout = {};
        page.sections.forEach((section) => {
            layout[section.sectionName] = {
                title: section.title,
                subtitle: section.subtitle,
                desc: section.desc,
                ctaLabel: section.ctaLabel,
                ctaLink: section.ctaLink,
                badge: section.cards ? section.cards.badge : undefined,
            };
        });
        return layout;
    }
    async updateSection(slug, sectionName, content) {
        // Upsert the page
        let page = await this.prisma.cmsPage.findUnique({ where: { slug } });
        if (!page) {
            page = await this.prisma.cmsPage.create({
                data: {
                    slug,
                    title: slug.charAt(0).toUpperCase() + slug.slice(1),
                },
            });
        }
        // Find the section
        let section = await this.prisma.cmsSection.findFirst({
            where: {
                pageId: page.id,
                sectionName,
            },
        });
        const sectionData = {
            title: content.title || "",
            subtitle: content.subtitle || "",
            desc: content.desc || "",
            ctaLabel: content.ctaLabel || "",
            ctaLink: content.ctaLink || "",
            cards: content.badge ? { badge: content.badge } : {},
        };
        if (section) {
            section = await this.prisma.cmsSection.update({
                where: { id: section.id },
                data: sectionData,
            });
        }
        else {
            section = await this.prisma.cmsSection.create({
                data: {
                    pageId: page.id,
                    sectionName,
                    ...sectionData,
                },
            });
        }
        return section;
    }
};
exports.CmsService = CmsService;
exports.CmsService = CmsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], CmsService);
