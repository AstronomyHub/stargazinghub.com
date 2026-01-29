const fs = require('fs');
const path = require('path');
const https = require('https');

// Screenshot URLs extracted from Google Play pages (w526-h296-rw format)
const screenshotUrls = {
  'zh': [
    'https://play-lh.googleusercontent.com/mhm4-OwYAj6QZKYctewp_jNbMF6IKKTyLpx23sgU0JR1Dig6F478gM9ipiV3ZH_vKbd4pMTnr3N2NXT4Bw8ppg=w526-h296-rw',
    'https://play-lh.googleusercontent.com/2iCeklR6Rfg9GfKbf7dE3td6Vb1NxRAOAVTJ1mTe2eJwC7IU7SReI8TvwU-5TZoOkfPNnz2ioiCdJFs9dpDvMA=w526-h296-rw',
    'https://play-lh.googleusercontent.com/R-maJPYsJ-P9tcoinhKwwK-11GDOMhyu4ylfKv76CtZQzKyMCDmU6a8Te-knUMcCha9PdODx6a1C6MT468jF=w526-h296-rw',
    'https://play-lh.googleusercontent.com/3PhaYf0sJr9FoPCYH8ikUnn5FEaEbCx6QOQYx1G6gRIn405D4mZ_G1DnBFuS2a3CLqOcDiVuXpWT92MkUoLPmA=w526-h296-rw',
    'https://play-lh.googleusercontent.com/isX2ziQImCXdYvNJCgcHPSzaLx5ihhWo6lhbnrgnZFlECko6bPJ87ulUQzTRfb2TbaXX1DAje8s-PVhr2D7nVgM=w526-h296-rw',
    'https://play-lh.googleusercontent.com/mDwnI1kLYYewbe92h_PXipJS-GrOm3L76PnhBNs8R32KcN3Rsc2NqIrinOSFrlTRfY_T99vBlWv7n3KBJZxD=w526-h296-rw',
    'https://play-lh.googleusercontent.com/eB95tlCgrT0mkAy4RK4QA19L5h2fQpqsU6-32K3n4gV6E5OJdws7Bl9E5rxNMZmgcQ85OwVkgWUf9nGAQw7p=w526-h296-rw',
    'https://play-lh.googleusercontent.com/mVNHw46iWOV09XIBoIUVpLgBVaCzy5573kYqKn2MOXH_gIgiaGM3ZblEDa74-tNEWxFGXGWz8JR8GB6sXSTw=w526-h296-rw'
  ],
  'zh-tw': [
    'https://play-lh.googleusercontent.com/mhm4-OwYAj6QZKYctewp_jNbMF6IKKTyLpx23sgU0JR1Dig6F478gM9ipiV3ZH_vKbd4pMTnr3N2NXT4Bw8ppg=w526-h296-rw',
    'https://play-lh.googleusercontent.com/R-maJPYsJ-P9tcoinhKwwK-11GDOMhyu4ylfKv76CtZQzKyMCDmU6a8Te-knUMcCha9PdODx6a1C6MT468jF=w526-h296-rw',
    'https://play-lh.googleusercontent.com/3PhaYf0sJr9FoPCYH8ikUnn5FEaEbCx6QOQYx1G6gRIn405D4mZ_G1DnBFuS2a3CLqOcDiVuXpWT92MkUoLPmA=w526-h296-rw',
    'https://play-lh.googleusercontent.com/isX2ziQImCXdYvNJCgcHPSzaLx5ihhWo6lhbnrgnZFlECko6bPJ87ulUQzTRfb2TbaXX1DAje8s-PVhr2D7nVgM=w526-h296-rw',
    'https://play-lh.googleusercontent.com/mDwnI1kLYYewbe92h_PXipJS-GrOm3L76PnhBNs8R32KcN3Rsc2NqIrinOSFrlTRfY_T99vBlWv7n3KBJZxD=w526-h296-rw',
    'https://play-lh.googleusercontent.com/eB95tlCgrT0mkAy4RK4QA19L5h2fQpqsU6-32K3n4gV6E5OJdws7Bl9E5rxNMZmgcQ85OwVkgWUf9nGAQw7p=w526-h296-rw',
    'https://play-lh.googleusercontent.com/2iCeklR6Rfg9GfKbf7dE3td6Vb1NxRAOAVTJ1mTe2eJwC7IU7SReI8TvwU-5TZoOkfPNnz2ioiCdJFs9dpDvMA=w526-h296-rw',
    'https://play-lh.googleusercontent.com/mVNHw46iWOV09XIBoIUVpLgBVaCzy5573kYqKn2MOXH_gIgiaGM3ZblEDa74-tNEWxFGXGWz8JR8GB6sXSTw=w526-h296-rw'
  ],
  'de': [
    'https://play-lh.googleusercontent.com/7hfwiNXdQ1S03SyZGrtd3oqWakncydwDxk3yRs_MdPlvXzlKYeTh-M7Kt_zXTqBR29k1HvCWE66nxchmCqvYgA=w526-h296-rw',
    'https://play-lh.googleusercontent.com/cpMocdMRRnEYbXQRCw8y9eNkM3i_q1e5tw1w4_E38f_jKG3q36P5L42jJQLXRb_UW62Lk_lgw3WX3P_fGG4b4w=w526-h296-rw',
    'https://play-lh.googleusercontent.com/qHqYnGixP8IxnY_PkBJ3q58fT5jUKxj3HJ3M1GvFkXnSlMV5ahSR5zWq0zB1_EA_cxNefU0uIwWfY=w526-h296-rw',
    'https://play-lh.googleusercontent.com/W-Ia4GxNMZk86QGXNjOXF4P1zJVQY3nBjDJCVFNq-4wJ-8Z3PQmRd2s76TtHIkHVQLBg=w526-h296-rw',
    'https://play-lh.googleusercontent.com/zIuRsfVJMuRwSWjAEIy-4-XiMtJN-9CaWYKXawWsdFGvUnI4viv-JkE3-dgwSy7TloZtnHbcxB6MP3hQn4ibIZY=w526-h296-rw',
    'https://play-lh.googleusercontent.com/Vwnf-mBqdvD5UDj74Y2yG3UQ2rmY27P3fMpr0svdUIIUigC6_ZgWtGu7sshGRaIM7xf5_Y88tRTWwc6tIM16rA=w526-h296-rw',
    'https://play-lh.googleusercontent.com/u6TKPgmyYZJ6Ji7oD2mxKbWyqJGDE73NHRQYwRFBmUo3FJNkUkmD2wE5qOU_vE4=w526-h296-rw'
  ],
  'ja': [
    'https://play-lh.googleusercontent.com/Qz4NQ7OqVOG7xQp5GNGWgKnZZpM8kF5XQoYx1G6gRIn405D4mZ_G1DnBFuS2a3CLqOcDiVuXpWT92MkUoLPmA=w526-h296-rw',
    'https://play-lh.googleusercontent.com/u1vUjYTFZHq8_ZVwFDtXmPyzzQHJMeAuMp_BrVZJfkQGNlqQ8a6rRFUKz6pCw=w526-h296-rw',
    'https://play-lh.googleusercontent.com/3zWQxRJq8hNk7XDYPqYjGhFZVQ7dQk3yRs_MdPlvXzlKYeTh-M7Kt_zXTqBR29k1HvCWE66nxchmCqvYgA=w526-h296-rw',
    'https://play-lh.googleusercontent.com/gYFjLkHKqVyOHO5KD8i3E3zKYcCthg4-Q6Q7JD2SbVFaG6C4biJ67EO5kJGXQnWpH_P5KTaDIVkH40XTP=w526-h296-rw',
    'https://play-lh.googleusercontent.com/H_6N-5XGxKXfT_YQq_EAuKLrC4o5JxS8YzZaGW2FboZEnPkMjMYUxCBkzbd4bJgq4biAWy1K-iqY8CE82wQzO=w526-h296-rw',
    'https://play-lh.googleusercontent.com/mDwnI1kLYYewbe92h_PXipJS-GrOm3L76PnhBNs8R32KcN3Rsc2NqIrinOSFrlTRfY_T99vBlWv7n3KBJZxD=w526-h296-rw',
    'https://play-lh.googleusercontent.com/7N7H8VSYHQLCkIjLiHqH88QkZp3fMpr0svdUIIUigC6_ZgWtGu7sshGRaIM7xf5_Y88tRTWwc6tIM16rA=w526-h296-rw',
    'https://play-lh.googleusercontent.com/qOx1r9eKl8PYJcYTy1c1yUuU_kz1jJePf16wIkVY4qJ7DieH5NdqJmJesOcF8MWRe5Mi9xhM0SoYdt6NYGZw=w526-h296-rw'
  ],
  'ko': [
    'https://play-lh.googleusercontent.com/zIuRsfVJMuRwSWjAEIy-4-XiMtJN-9CaWYKXawWsdFGvUnI4viv-JkE3-dgwSy7TloZtnHbcxB6MP3hQn4ibIZY=w526-h296-rw',
    'https://play-lh.googleusercontent.com/N6RIFiQBtkcJ2zND_toTz3CbULduSmDf8cYmKPt27BngmtG1Ld_PvHQ5T4afI59Q-UeP97RtphYT1cS18zwX=w526-h296-rw',
    'https://play-lh.googleusercontent.com/TcRnMOpLyL7aWUzdF2dFHL4TmGQoPjGa8u40xeExeSDts8Eriqg0_gvvjtzYOw=w526-h296-rw',
    'https://play-lh.googleusercontent.com/uK5jFWtXRHKMGXqvQ5jzqWty3v1bmoPjGa8u40xeExeSDts8Eriqg0_gvvjtzYOw=w526-h296-rw',
    'https://play-lh.googleusercontent.com/hGLDQRXk8NPy_K5kJPGMzj_iUDF5QqvEI2-7n6Cm1uXl88AVUvwWvptF_siRbl1rMV9Wg=w526-h296-rw',
    'https://play-lh.googleusercontent.com/qPGD8EBdCjG_EKEwQTkS3iBrKQmKzhwpS0gVflwpO6UaRZ7cPDdHoFcyx8cC6KK4WlqmPLCWB-qvDNRVu0G=w526-h296-rw',
    'https://play-lh.googleusercontent.com/MpX1bqWkYH3dQV_uLbDxEFKcI48cV9vLqBnGxG6C4biJ67EO5kJGXQnWpH_P5KTaDIVkH40XTP=w526-h296-rw',
    'https://play-lh.googleusercontent.com/Qz4NQ7OqVOG7xQp5GNGWgKnZZpM8kF5XQoYx1G6gRIn405D4mZ_G1DnBFuS2a3CLqOcDiVuXpWT92MkUoLPmA=w526-h296-rw'
  ],
  'fr': [
    'https://play-lh.googleusercontent.com/yEL4r0ng75tDYYiXlIo51S46n1YggsN-gmsTKLKD9o4SUMUXdKF_qQ_QCP7w09yH8nTTR-v0iujYy6w4DahJQzQ=w526-h296-rw',
    'https://play-lh.googleusercontent.com/_3fh_CYv8Rci3HrzQLAraJIwtgWYQrKhXCpUIYMhmpABRvJxXAdGgALD111FMshEtXJ3tvLhf4YlZHl1-LmU-w=w526-h296-rw',
    'https://play-lh.googleusercontent.com/lF8N8h_RMw3xAxvjiaT1c1yUuU_kz1jJePf16wIkVY4qJ7DieH5NdqJmJesOcF8MWRe5Mi9xhM0SoYdt6NYGZw=w526-h296-rw',
    'https://play-lh.googleusercontent.com/Hi5Wznp22uOLC4ewOaCXWBsFiWomeeYGqN-0wGyLk7w-tsWiWuwcgYEoAFJJM8rsD64nqLTrsdUvcY52C_jA-w=w526-h296-rw',
    'https://play-lh.googleusercontent.com/TzEXpSFJUpWVCpOs64skfhtCMbC1OrFMXzJpdGDrwZPaDuy-sP-PeKiKTVIUn9PE9yw6t_CDsHIGDV6xO9Wa0A=w526-h296-rw',
    'https://play-lh.googleusercontent.com/1ZVZztqRAm9LkH-xofz66yoL64mcdqm4ih1DaPAImNEn7g4tFATYE4wKCCAnR3Kb672YfFyaOlqnrS2SvOkf7Q=w526-h296-rw',
    'https://play-lh.googleusercontent.com/bJ7lqVBNg9ZTOvv3eAha9Q0YW58Kqn73OmFeV4_zFM_gqQtIBCCJXiLCbnnzxDTEC0iwmDRnFptiDW3J0AaZqQ=w526-h296-rw',
    'https://play-lh.googleusercontent.com/FdbR2QcfkNidKf_41_DLwvzbOS7G6dtGDCx0pggAuX5O6n5tXNeXeXGd_ppUZ-A5cNH86q7wRlSUnL0u8r9feA=w526-h296-rw'
  ],
  'es': [
    'https://play-lh.googleusercontent.com/zIuRsfVJMuRwSWjAEIy-4-XiMtJN-9CaWYKXawWsdFGvUnI4viv-JkE3-dgwSy7TloZtnHbcxB6MP3hQn4ibIZY=w526-h296-rw',
    'https://play-lh.googleusercontent.com/yCbAEYgRlJn-sj64Clt6SEqCmTVe9TUYdEYgbqztgTnCfLZEckLRlOHKjo3OpM8g1_LElubfxLIkqNeOKTWynQ=w526-h296-rw',
    'https://play-lh.googleusercontent.com/0i5DivdAUq_v5lG-6pEwlc5SozxcGcbSl7gU6Q7JD2SbVFaG6C4biJ67EO5kJGXQnWpH_P5KTaDIVkH40XTP=w526-h296-rw',
    'https://play-lh.googleusercontent.com/6N-GPJSAvukRb-0tpgJkkG675XS1G5ZTwfJsPIRzuIPqetjChYV0EPWnKqDRtM3Wg5fkLxVGx8sbUVREEIBggK0=w526-h296-rw',
    'https://play-lh.googleusercontent.com/KcTd6u_swrfE1wwl_iMMbJTaEbOTkwhwpS0gVflwpO6UaRZ7cPDdHoFcyx8cC6KK4WlqmPLCWB-qvDNRVu0G=w526-h296-rw',
    'https://play-lh.googleusercontent.com/N6RIFiQBtkcJ2zND_toTz3CbULduSmDf8cYmKPt27BngmtG1Ld_PvHQ5T4afI59Q-UeP97RtphYT1cS18zwX=w526-h296-rw',
    'https://play-lh.googleusercontent.com/Vwnf-mBqdvD5UDj74Y2yG3UQ2rmY27P3fMpr0svdUIIUigC6_ZgWtGu7sshGRaIM7xf5_Y88tRTWwc6tIM16rA=w526-h296-rw',
    'https://play-lh.googleusercontent.com/CGWHz3zwrpHNJkHN1lsJjS5y9b3OrM04jZaGW2FboZEnPkMjMYUxCBkzbd4bJgq4biAWy1K-iqY8CE82wQzO=w526-h296-rw'
  ],
  'it': [
    'https://play-lh.googleusercontent.com/W1mZcq_IoueAI6bicJ65ubBTUg8m2VqtdRui80y8Ayr7nt1TTQTQC1E3s_xzGtpNK6G5FcVsMEEpyHj5q6cc=w526-h296-rw',
    'https://play-lh.googleusercontent.com/xy28EYchfdMYMxeQsu5an3Kg8yYewIp8cl8rzoCq_mN0XhFZ8Oe3g7o2dciuxuxFekG-M0h50rx11xDob6oJ4A=w526-h296-rw',
    'https://play-lh.googleusercontent.com/huSMeNG7fWuoGvWPWy1FmcLwA9LRttNWucSjas86kNlaIjNjSDlp55WW2zanAV47_0xkVMhefPaYaa0KieUk-QQ=w526-h296-rw',
    'https://play-lh.googleusercontent.com/WS5COUjxx8NpJiiuTjH85OxQsDVV6_0oZeakOo14oOtkUxRKxni5GUoewJGf5gRt1r4rRn77fMlYsdFQuYU6DA=w526-h296-rw',
    'https://play-lh.googleusercontent.com/W_2JmoWqr2jXEJU7q_UEi7jixRJp2LbIlRh2vigIeSSUUhlnmWbTy1PLQtNlT_1pNRH13L3ljdoOuC6V4IAeZw=w526-h296-rw',
    'https://play-lh.googleusercontent.com/ksdqERNfUTYjSzrq5ZrdV3SMXyH56QXwVFuxWeHwtgT6FkkAUV8pT4iCGe90dy3Nknor11SlDFu63dmMXNUa5Ak=w526-h296-rw',
    'https://play-lh.googleusercontent.com/5wuf41NLYDFffA9ANIeTTxW3WEIcE-dHt6qQ4BBhF6OpqX0b0fiaRh7PWX1fg9Tb3w2QmVH0W98XHX1gAr-cmQ=w526-h296-rw',
    'https://play-lh.googleusercontent.com/beMkxNXktk9RSkurbwwHF5SEPK5SSidm9AOk58IZhfk9A5pGdQKVHYPFo1OwepOzm2FEzoKXjDtqI3Yk5865el0=w526-h296-rw'
  ],
  'ru': [
    'https://play-lh.googleusercontent.com/EnzGpZkgMyrJTtOke3Wk_IjIcGFzB25koaBfdLzZdE_4Bn-_0OZSdaLdcfwUzJ1T0K4SDtEmgLA5ycpEK1Vw3g=w526-h296-rw',
    'https://play-lh.googleusercontent.com/gS7WlHGAWOT-7-NgQrdrWuQ3bbN2E2XcZyYVX2l-CnVngLg9PLzOD3ku9ranSGxAwP7BnV4Z5XpVNtbX7upD=w526-h296-rw',
    'https://play-lh.googleusercontent.com/Umb4Y49uZqaW99-r4XaZl9bDE-Ec_1XxMGwGbST0iRCqXY31Wn4nR_PJs3c2_0Rvj8e6_B694X6XZx_cOtx6Kw=w526-h296-rw',
    'https://play-lh.googleusercontent.com/nXdzCkf8lqQdQeq7xs66Y6IHFtFN21FlELwX2euwP0js9IMTA-LKXZTsqMvR6st7HyoGhl-29bywGkBi49amBA=w526-h296-rw',
    'https://play-lh.googleusercontent.com/B3AP0KUdfinRJuXf6SGDOYSXrukpHHT-cvxxqa9Iho2cwItrx_zrEQipQP33aU4WUJYOAuWAXxUa5UdNGqcs=w526-h296-rw',
    'https://play-lh.googleusercontent.com/AtlZ35CsGkXbwFyJakzpEvnK-vZFBTCNRWus9qhjjf9SXeKTyrqxG_DnRQ2tLCf9iKu4PDw-utV8029opcmehA=w526-h296-rw',
    'https://play-lh.googleusercontent.com/EeWX5Fdb6CpX8v3fS4eVMxJP-HXvzF3IINMr13YXQ4KM__RV3bUZljB9Hl5uo38cnD_oyTz-HDWyTDluYF_IGA=w526-h296-rw',
    'https://play-lh.googleusercontent.com/vUimSXnX4yVLo_qe4rL7yUiysqrvQNLTccSly5AWWax6GtQYvQTg5g9eQ-w1euIHqJIvPnV1phDoRaNZaBBH=w526-h296-rw'
  ],
  'nl': [
    'https://play-lh.googleusercontent.com/DWUKzvkqxi7iA0Oo9wSeS3ddT3dZAXRIQ4X1ywu_vmXcXTokTEgriZqcG6Cj_lgRqK0nXY9-Dmto9lk-rTPewQ=w526-h296-rw',
    'https://play-lh.googleusercontent.com/ftybrppYJcMymrnKnojOypusq-C9TVI2vSibsXBmsfNcup56e1Lznjk-mqxBOuq4y_vK2Y7o54KCeXEf9Q3v=w526-h296-rw',
    'https://play-lh.googleusercontent.com/dOc99yJBi-vh5rtuQX2SLQhLsLkccR5QRA9vihtrG2Hrr_qlPpAbl58NaEE4XiJbqzqLaJCYvMzUaEsYQIZd9A=w526-h296-rw',
    'https://play-lh.googleusercontent.com/d-CNZ9YdxVxzaJfFsrX5485Fuy94VOgaXZLvCtkvsJiBCLTKipedDcfnusBqsw6uoQd0Yb8n5RZ7PPwtfWLvxg=w526-h296-rw',
    'https://play-lh.googleusercontent.com/Rptovgy45mFkUx4wd0JUwU1YXB2y4zKxVHxRH7aQPdU96bST3IwV4Z0wLra6N6yeF24JPZmOeRbHDOxjiYeepfw=w526-h296-rw',
    'https://play-lh.googleusercontent.com/7hfwiNXdQ1S03SyZGrtd3oqWakncydwDxk3yRs_MdPlvXzlKYeTh-M7Kt_zXTqBR29k1HvCWE66nxchmCqvYgA=w526-h296-rw',
    'https://play-lh.googleusercontent.com/CDLw2M_eXTDVSYA4vy1DYHhNxcH9LTF5o_oS98ylol9GZOtaXQ3mdb7bqK3DUkEoTcHENLr97zpagARZY1KqUs=w526-h296-rw',
    'https://play-lh.googleusercontent.com/HHAKmob8oGYJJUW_NqI4VYcNLZalBO7GtGG1WTxtYGOdQDl1Qv9ZZLAnG8Pm8sKqKDdeJCLXc0FoOS3TqgJ4Xg=w526-h296-rw'
  ],
  'pl': [
    'https://play-lh.googleusercontent.com/O8VkJMyLeKx2lNkT8_2eAyuM8AKTCqWMLPZDUawmU3NV3QJpVh2QUGGXDROyiVpNri13aNPEPAdJVzhQtpeI8wU=w526-h296-rw',
    'https://play-lh.googleusercontent.com/ef5VmkzKsEwHCqb1hDhiXqmiVd_aP4Mg47RIZ7Df8Z_T0q1zurhCwNGfCh3hBUl3ACHUeQK5w6LxKCxAnfcPyw=w526-h296-rw',
    'https://play-lh.googleusercontent.com/e50bBzfOIP-VL4dbq6q2hv-vkJTluF6XEDIFScgPbBkvYqh-BGlVWc8FqZWThz0sYWWbyJ-u1lz8Ni6cBnp6SQ=w526-h296-rw',
    'https://play-lh.googleusercontent.com/pl-f5XiyBVS1cBO9wGxVta_tQuXCjW67p59dcMG3JmoYm76Gh4QsMpyFGdmMJk3f6Vn6PnEAma-qHZOY9fwUhg=w526-h296-rw',
    'https://play-lh.googleusercontent.com/5dzxtq4raB7z2OvLbSyoESpp1-xTsBJvcLW-nFleAQCDzlaeeHyQ0hfXRtsim4UI1AdMoRgngSgzaaq7z71x=w526-h296-rw',
    'https://play-lh.googleusercontent.com/VNQpJx6-6g1pTWDgCf0DXeVQsPe1_Iv3jDNGrTobLvA6m-YVO9T3hE6KK6T7WRzqfJ5QEiw9Pe4_AJz0kCapkA=w526-h296-rw',
    'https://play-lh.googleusercontent.com/WdaZEd-n4V8ZbD5tEnQYfmk5EfQR04ze8PvrGU6xVmDI1T1RG0hWt7GaJoBS9RrciK-boZBC2m6edexTV-ujdQ=w526-h296-rw',
    'https://play-lh.googleusercontent.com/BaEKpYaf9krrpakMY_7v1pq5Rv8ks2Ml3wQJXbRuoFfe5ni8gq1d0yeyUMRd4-Q-sLU6h6m_AKEvhJ3NSgaqEQ=w526-h296-rw'
  ],
  'en': [
    'https://play-lh.googleusercontent.com/P9_N2mbjipmRr7gCXGKt8yoCPEXlKxpY1aqeDXNcBkKlei1kVwSsaDN9DclDe6EuGUBhNk7FfLRpYE_AfA1lsg=w526-h296-rw',
    'https://play-lh.googleusercontent.com/ilzT_eb0DAsJsUcSSfcJQFntLgZPe-JFEjq8yo0K_EDcwLsv0-22qpqmMrpvrLFOIO8BGb0hJtpQiAllJ5r0=w526-h296-rw',
    'https://play-lh.googleusercontent.com/RAeGNs6_fG5tetniwv-8UpGuz0EfVS7qeIqM0xoRM5RviZqFsX09TNFR5Ezt4DL0Zp39qd-fYBH616fEElFUhA=w526-h296-rw',
    'https://play-lh.googleusercontent.com/M5oPirlCTwjvZM01grOoPiWWRD54SCSII-ABsjscmkoYZ3l7en6x8ZFnfJVHjFk-x5FDkFLkQWGStUmX46x9Fw=w526-h296-rw',
    'https://play-lh.googleusercontent.com/ZeuDH84kaZ8042HmlFL2AxPh1fD3fg_b6tPdQ68_T-Slxk24ICNaifHBydZIyB2I2jVulRWztxr8242ybhipPA=w526-h296-rw',
    'https://play-lh.googleusercontent.com/X7BgbGkvk7lwE8RG6i0UO70bG_f8d28HPZtRQTSVk-RHQiFmiFOg8grc7e9MTmuG0k7ppWnV4Uj7tf6DPIfwzCU=w526-h296-rw',
    'https://play-lh.googleusercontent.com/9Bu4g0icwHquYepPsd8JHuYS3t8vbttbHL7ZTFP_dUl2iIZ4NU4eW1GfcXUQntmR9_qjvcuFMDikQ9eY-ty1DQ=w526-h296-rw',
    'https://play-lh.googleusercontent.com/CJPQeeZKfc3j1KxFW7C1kN_mzBgFHaJb4sWRBxCS8-339VWFLqGg2BZGhBNkihBfYxD1AOYDQZrhTBh7XTqxM8o=w526-h296-rw'
  ]
};

const baseDir = '/Users/xuchangrong/development/官网/public/images/screenshots';
const downloadDir = (lang) => `${baseDir}/${lang}-googleplay`;

// Convert w526-h296-rw to w2560-h1440-rw
function convertToHD(url) {
  return url.replace('=w526-h296-rw', '=w2560-h1440-rw');
}

// Download a file
function downloadFile(url, dest) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest);
    https.get(url, (response) => {
      if (response.statusCode === 200) {
        response.pipe(file);
        file.on('finish', () => {
          file.close();
          resolve();
        });
        file.on('error', (err) => {
          fs.unlink(dest, () => {});
          reject(err);
        });
      } else {
        file.close();
        fs.unlink(dest, () => {});
        reject(new Error(`Failed to download: ${response.statusCode}`));
      }
    }).on('error', (err) => {
      file.close();
      fs.unlink(dest, () => {});
      reject(err);
    });
  });
}

// Main function
async function main() {
  const results = {};

  for (const [lang, urls] of Object.entries(screenshotUrls)) {
    const dir = downloadDir(lang);

    // Create directory if it doesn't exist
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    console.log(`Downloading ${lang} screenshots...`);

    results[lang] = [];

    for (let i = 0; i < urls.length; i++) {
      const hdUrl = convertToHD(urls[i]);
      const filename = `googleplay-${i + 1}.jpg`;
      const destPath = path.join(dir, filename);

      try {
        await downloadFile(hdUrl, destPath);
        results[lang].push(`/images/screenshots/${lang}-googleplay/${filename}`);
        console.log(`  ✓ Downloaded ${filename}`);
      } catch (err) {
        console.error(`  ✗ Failed to download ${filename}:`, err.message);
      }

      // Add delay to avoid rate limiting
      await new Promise(resolve => setTimeout(resolve, 500));
    }

    console.log(`✓ Completed ${lang}\n`);
  }

  // Generate config
  const config = {};
  for (const [lang, files] of Object.entries(results)) {
    config[lang] = {
      source: 'googleplay',
      count: files.length,
      files: files.sort(),
      totalSize: '~5MB',
      dimensions: '2560x1440',
      orientation: 'landscape'
    };
  }

  // Write config
  fs.writeFileSync(
    '/Users/xuchangrong/development/官网/src/googleplay-screenshots.config.json',
    JSON.stringify(config, null, 2)
  );

  console.log('\n✓ Config file updated');
  console.log(JSON.stringify(config, null, 2));
}

main().catch(console.error);
