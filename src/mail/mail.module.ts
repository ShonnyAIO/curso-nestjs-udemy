import { Module } from '@nestjs/common';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';

@Module({
    imports : [
        /*
        MailerModule.forRoot({
            transport : {
                host : process.env.MAIL_HOST,
                secure : process.env.MAIL_SECURE === 'true',
                port: process.env.MAIL_PORT,
                auth : {
                    user: process.env.MAIL_USER,
                    pass: process.env.MAIL_PASSWORD
                },
            },
            defaults : {
                from : '"nest-modules" <module@nestjs.com>',
            },
            template : {
                dir: __dirname + '/templates',
                adapter : new HandlebarsAdapter(),
                options : {
                    strict : true
                },
            },
        }), */
        MailerModule.forRootAsync({
            useFactory: () => {
                console.log('👾 Cargando Mailer')
                return {
                    transport : {
                        host : process.env.MAIL_HOST,
                        secure : process.env.MAIL_SECURE === 'true',
                        port: process.env.MAIL_PORT,
                        auth : {
                            user: process.env.MAIL_USER,
                            pass: process.env.MAIL_PASSWORD
                        },
                    },
                    defaults : {
                        from : `"nest-modules" <${process.env.MAIL_FROM}>`,
                    },
                    template : {
                        dir: __dirname + '/templates',
                        adapter : new HandlebarsAdapter(),
                        options : {
                            strict : true
                        },
                    },
                }
            }
        })
    ]
})
export class MailModule {}
