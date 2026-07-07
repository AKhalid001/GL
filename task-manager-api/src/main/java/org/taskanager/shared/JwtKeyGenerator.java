package org.taskanager.shared;

import java.security.KeyPair;
import java.security.KeyPairGenerator;
import java.util.Base64;

public class JwtKeyGenerator {
    public static void main(String[] args)
            throws Exception {

        KeyPairGenerator generator =
                KeyPairGenerator.getInstance("RSA");

        generator.initialize(2048);

        KeyPair pair =
                generator.generateKeyPair();

        System.out.println(
                Base64.getEncoder()
                        .encodeToString(
                                pair.getPrivate()
                                        .getEncoded()
                        )
        );

        System.out.println("================================");

        System.out.println(
                Base64.getEncoder()
                        .encodeToString(
                                pair.getPublic()
                                        .getEncoded()
                        )
        );
    }
}
