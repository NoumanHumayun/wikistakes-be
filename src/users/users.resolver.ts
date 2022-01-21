import {
  Resolver,
  Query,
  Mutation,
  Args,
  ResolveField,
  Parent
} from '@nestjs/graphql';
import { UsersService } from './users.service';
import { User } from './users.entity';
import { HttpException, HttpStatus, UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from 'src/auth/GQL-auth.guard';
import { SendgridService } from 'src/sendgrid/sendgrid.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Resolver('User')
export class UsersResolver {
  constructor(
    private readonly usersService: UsersService,
    private readonly sendgridService: SendgridService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService
  ) {}

  @Query()
  async user(@Args('id') id: string) {
    return await this.usersService.user(id);
  }

  @Query()
  async admin(@Args('id') id: string) {
    return await this.usersService.admin(id);
  }

  @Query()
  @UseGuards(GqlAuthGuard)
  async admins() {
    return await this.usersService.admins();
  }

  @Query()
  async influencer(@Args('id') id: string) {
    return await this.usersService.influencer(id);
  }

  @Query()
  @UseGuards(GqlAuthGuard)
  async influencers() {
    return await this.usersService.influencers();
  }

  @Query()
  @UseGuards(GqlAuthGuard)
  async userByEmail(@Args('email') email: string) {
    return await this.usersService.userByEmail(email);
  }

  @Query()
  @UseGuards(GqlAuthGuard)
  async users() {
    return await this.usersService.users();
  }

  @Query()
  @UseGuards(GqlAuthGuard)
  async usersByEmails(@Args('emails') emails) {
    return await this.usersService.usersByEmail(emails);
  }

  @Mutation()
  async addUser(@Args('input') input) {
    const user = await this.usersService.find({
      email: input.email
    });
    if (user && user.isVerified) return user;

    const _user = new User();
    _user.email = input.email;
    _user.firstName = input.firstName;
    _user.lastName = input.lastName;
    _user.email = input.email;
    _user.address = input.address;
    _user.city = input.city;
    _user.state = input.state;
    _user.zip = input.zip;
    _user.imageUrl = input.imageUrl;
    _user.country = input.country;
    _user.isVerified = input.isVerified;
    _user.role = input.role;
    _user.social1 = input.social1;
    _user.social2 = input.social2;
    _user.socialType1 = input.socialType1;
    _user.socialType2 = input.socialType2;
    _user.bank = input.bank;
    _user.aba = input.aba;
    _user.account = input.account;

    if (input.password) _user.password = input.password;

    const __user = await this.usersService.create({
      id: user?.id,
      ..._user
    });
    const token = this.jwtService.sign({ ...__user });
    this.sendgridService.sendEmail('verify', [input.email], {
      verifyUrl: `${this.configService.get('appUrl')}confirmation/${token}`
    });

    return __user;
  }

  @Mutation()
  @UseGuards(GqlAuthGuard)
  async updateUser(@Args('input') input: any) {
    // const { userId, ...rest } = input;
    const eta = await this.usersService.update(input);
    // this.pubSub.publish('updateUser', {
    //   usersSubscription: {
    //     userId: eta?.id,
    //     ...eta
    //   }
    // });
    return eta;
  }

  // @Subscription((returns) => Event, {
  //   filter: (payload, variables) =>
  //     payload?.usersSubscription?.userId === variables?.userId
  // })
  // public async usersSubscription(@Args('userId') userId: string) {
  //   return this.pubSub.asyncIterator('updateUser');
  // }

  @Mutation()
  async login(@Args('input') input: any) {
    const { email, password } = input;
    if (!email || !password)
      return new HttpException(
        'Required fields missing',
        HttpStatus.PERMANENT_REDIRECT
      );
    const user = await this.usersService.userByEmail(email);
    if (user) {
      if (user?.password && password !== user?.password) {
        return new HttpException(
          'Invalid Email/Password!',
          HttpStatus.BAD_REQUEST
        );
      }
    } else {
      return new HttpException("User doesn' exist!", HttpStatus.BAD_REQUEST);
    }
    const token = this.jwtService.sign({ ...user });
    return { token: token, ...user };
  }

  @Mutation()
  @UseGuards(GqlAuthGuard)
  async deleteUser(@Args('id') id: string) {
    return await this.usersService.delete(id);
  }

  @ResolveField()
  public async sweeps(@Parent() parent: User) {
    return parent.sweeps;
  }
}
