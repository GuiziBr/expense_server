import { CurrentUserInterceptor } from '@/infra/auth/current-user.interceptor'
import { Test } from '@nestjs/testing'
import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'

describe('AuthController', () => {
  let authController: AuthController
  let authService: AuthService

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: {
            signIn: vi.fn()
          }
        }
      ]
    })
      .overrideInterceptor(CurrentUserInterceptor)
      .useValue({})
      .compile()

    authController = module.get<AuthController>(AuthController)
    authService = module.get<AuthService>(AuthService)
  })

  describe('signIn', () => {
    it('should return token', async () => {
      const body = { email: 'email',password: 'password' }

      vi.spyOn(authService, 'signIn').mockResolvedValue({
        token: 'token',
        user: {
          id: 'user_id',
          name: 'name',
          email: 'email',
          avatar: 'avatar',
          password: 'password',
          createdAt: new Date(),
          updatedAt: new Date()
        }
      })

      const authenticatedUser = await authController.signIn(body)

      expect(authenticatedUser).toHaveProperty('token')
      expect(authenticatedUser).toHaveProperty('user')
      expect(authenticatedUser.user).toMatchObject({
        id: expect.any(String),
        name: expect.any(String),
        email: expect.any(String),
        avatar: expect.any(String)
      })

      expect(authService.signIn).toBeCalledWith(body.email, body.password)
    })
  })
})
