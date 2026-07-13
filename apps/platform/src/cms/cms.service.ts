import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class CmsService {
  constructor(private readonly prisma: PrismaService) {}

  async getPageLayout(slug: string) {
    const page = await this.prisma.cmsPage.findUnique({
      where: { slug },
      include: { sections: true },
    });
    
    if (!page) {
      return {};
    }

    const layout: Record<string, any> = {};
    page.sections.forEach((section: any) => {
      layout[section.sectionName] = {
        title: section.title,
        subtitle: section.subtitle,
        desc: section.desc,
        ctaLabel: section.ctaLabel,
        ctaLink: section.ctaLink,
        badge: section.cards ? (section.cards as any).badge : undefined,
      };
    });

    return layout;
  }

  async updateSection(slug: string, sectionName: string, content: any) {
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
    } else {
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
}
