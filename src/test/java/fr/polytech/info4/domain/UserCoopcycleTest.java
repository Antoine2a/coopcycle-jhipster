package fr.polytech.info4.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import fr.polytech.info4.web.rest.TestUtil;

public class UserCoopcycleTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(UserCoopcycle.class);
        UserCoopcycle userCoopcycle1 = new UserCoopcycle();
        userCoopcycle1.setId(1L);
        UserCoopcycle userCoopcycle2 = new UserCoopcycle();
        userCoopcycle2.setId(userCoopcycle1.getId());
        assertThat(userCoopcycle1).isEqualTo(userCoopcycle2);
        userCoopcycle2.setId(2L);
        assertThat(userCoopcycle1).isNotEqualTo(userCoopcycle2);
        userCoopcycle1.setId(null);
        assertThat(userCoopcycle1).isNotEqualTo(userCoopcycle2);
    }
}
