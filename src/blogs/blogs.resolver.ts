import {
  Resolver,
  Query,
  Mutation,
  Args,
  ResolveField,
  Parent
} from '@nestjs/graphql';
import { BlogsService } from './blogs.service';
import { Blog } from './blogs.entity';
import { HttpException, HttpStatus, UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from 'src/auth/GQL-auth.guard';
import { SendgridService } from 'src/sendgrid/sendgrid.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { UsersService } from 'src/users/users.service';

@Resolver('Blog')
export class BlogsResolver {
  constructor(
    private readonly blogsService: BlogsService,
    private readonly sendgridService: SendgridService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly usersService: UsersService
  ) {}

  @Query()
  async blog(@Args('id') id: string) {
    return await this.blogsService.blog(id);
  }

  @Query()
  @UseGuards(GqlAuthGuard)
  async blogs() {
    return await this.blogsService.blogs();
  }

  @Mutation()
  async addBlog(@Args('input') input) {
    const { id, title, publishDate, content, userId } = input;
    const user = this.usersService.find({ id: userId });

    const _blog = new Blog();
    _blog.id = id;
    _blog.title = title;
    _blog.publishDate = publishDate;
    _blog.content = content;
    _blog.author = user;

    const __blog = await this.blogsService.create(_blog);
    const token = this.jwtService.sign({ ...__blog });
    this.sendgridService.sendEmail('blogCreated', [input.email], {
      blogUrl: `${this.configService.get('appUrl')}blog/${token}`
    });

    return __blog;
  }

  @Mutation()
  @UseGuards(GqlAuthGuard)
  async updateBlog(@Args('input') input: any) {
    const { blogId, ...rest } = input;
    const eta = await this.blogsService.update(input);
    return eta;
  }

  @Mutation()
  @UseGuards(GqlAuthGuard)
  async deleteBlog(@Args('id') id: string) {
    return await this.blogsService.delete(id);
  }

  @ResolveField()
  public async author(@Parent() parent: Blog) {
    return parent.author;
  }
}
