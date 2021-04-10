package fr.polytech.info4.aop.logging;

import io.github.jhipster.config.JHipsterConstants;

import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.AfterThrowing;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Pointcut;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.core.env.Environment;
import org.springframework.core.env.Profiles;

import java.util.Arrays;

@Aspect
public class MailLoggingAspect {

    private final Environment env;

    public MailLoggingAspect(Environment env) {
        this.env = env;
    }

    @Pointcut("within(fr.polytech.info4.repository..*)"+
    " || within(fr.polytech.info4.service..*)"+
    " || within(fr.polytech.info4.web.rest..*)")
    public void sendEmail() {
            // Method is empty as this is just a Pointcut, the implementations are in the advices.
    }

    @After("sendEmail()")
    public void sendNewEmail(JoinPoint joinPoint){
        Logger log = logger(joinPoint);
        if (log.isDebugEnabled()) {
            log.debug("test - log Mail logging Aspect");
            log.debug("Enter: {}() with argument[s] = {}", joinPoint.getSignature().getName(), Arrays.toString(joinPoint.getArgs()));
        }
        try {
            Object result = joinPoint.proceed();
            if (log.isDebugEnabled()) {
                log.debug("Exit: {}() with result = {}", joinPoint.getSignature().getName(), result);
            }
            return;
        } catch (IllegalArgumentException e) {
            log.error("Illegal argument: {} in {}()", Arrays.toString(joinPoint.getArgs()), joinPoint.getSignature().getName());
            throw e;
        }
    }

  
}
