import { User } from '@/domains/user.domain'
import { JwtService } from '@nestjs/jwt'
import { Test } from '@nestjs/testing'
import * as bcrypt from 'bcrypt'
import { UserService } from '../user/user.service'
import { AuthService } from './auth.service'

vi.mock('bcrypt', () => ({
  compare: vi.fn()
}))

describe('AuthService', () => {
  let authService: AuthService
  let userService: UserService
  let jwtService: JwtService

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UserService,
          useValue: {
            findUserByEmail: vi.fn().mockResolvedValue({
              id: 'user_id',
              name: 'name',
              email: 'email',
              avatar: 'avatar',
              password: 'password',
              createdAt: new Date(),
              updatedAt: new Date()
            } as User)
          }
        },
        {
          provide: JwtService,
          useValue: {
            signAsync: vi.fn().mockResolvedValue('token')
          }
        }
      ]
    }).compile()

    authService = module.get<AuthService>(AuthService)
    userService = module.get<UserService>(UserService)
    jwtService = module.get<JwtService>(JwtService)
  })

  describe('signIn', () => {
    it('should throw UnauthorizedException if user not found', async () => {
      vi.spyOn(userService, 'findUserByEmail').mockResolvedValue(null)

      await expect(authService.signIn('email', 'password'))
        .rejects
        .toThrow('Unauthorized')
    })

    it('throw UnauthorizedException if password not match', async () => {
      vi.spyOn(bcrypt, 'compare').mockImplementation(async () => false)

      await expect(authService.signIn('email', 'password'))
        .rejects
        .toThrow('Unauthorized')
    })

    it('should return authenticated user', async () => {
      vi.spyOn(bcrypt, 'compare').mockImplementation(async () => true)

      const result = await authService.signIn('email', 'password')

      expect(result).toHaveProperty('token')

      expect(result).toHaveProperty('user')

      expect(result).toEqual({
        user: {
          id: 'user_id',
          name: 'name',
          email: 'email',
          avatar: 'avatar',
          password: 'password',
          createdAt: expect.any(Date),
          updatedAt: expect.any(Date)
        },
        token: 'token'
      })

      expect(jwtService.signAsync).toBeCalledWith({ sub: 'user_id', email: 'email' })
    })
  })
})
