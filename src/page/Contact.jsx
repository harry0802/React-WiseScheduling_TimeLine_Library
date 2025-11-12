import React from "react";
import {
  Container,
  Typography,
  Box,
  TextField,
  Link as MuiLink,
  Grid,
} from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import GitHubIcon from "@mui/icons-material/GitHub";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import muiTheme from "../styles/muiTheme";
import {
  CreamPaper,
  GoldBorderContainer,
  GoldDivider,
} from "../components/StyledComponents";
import { colors } from "../designTokens";

const Contact = () => {
  return (
    <ThemeProvider theme={muiTheme}>
      <Container maxWidth="md" sx={{ py: 6, backgroundColor: colors.background.primary, minHeight: '100vh' }}>
        <GoldBorderContainer sx={{
          mb: 4,
          textAlign: 'center',
          clipPath: 'polygon(2rem 0, calc(100% - 2rem) 0, 100% 2rem, 100% calc(100% - 2rem), calc(100% - 2rem) 100%, 2rem 100%, 0 calc(100% - 2rem), 0 2rem)',
        }}>
          <Typography
            variant="h3"
            component="h1"
            gutterBottom
            sx={{
              fontWeight: 700,
              color: colors.accent.gold,
              mb: 2,
            }}
          >
            聯絡方式
          </Typography>
          <GoldDivider />
          <Typography variant="body1" sx={{ color: colors.text.inverse, mt: 2 }}>
            歡迎透過以下方式與我聯繫，我很樂意與您討論專案合作或技術交流的機會。
          </Typography>
        </GoldBorderContainer>

        <Grid container spacing={3}>
          {/* Social Links Section */}
          <Grid item xs={12}>
            <CreamPaper elevation={2} sx={{
              clipPath: 'polygon(1rem 0, calc(100% - 1rem) 0, 100% 1rem, 100% calc(100% - 1rem), calc(100% - 1rem) 100%, 1rem 100%, 0 calc(100% - 1rem), 0 1rem)',
            }}>
              <Typography
                variant="h5"
                gutterBottom
                sx={{
                  color: colors.accent.gold,
                  fontWeight: 600,
                  mb: 3,
                }}
              >
                社群連結
              </Typography>

              <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 2,
                    p: 2,
                    backgroundColor: colors.background.surfaceAlt,
                    border: `1px solid ${colors.border.light}`,
                    borderRadius: 2,
                    transition: "all 0.3s ease",
                    "&:hover": {
                      borderColor: colors.accent.gold,
                    },
                  }}
                >
                  <GitHubIcon sx={{ color: colors.accent.gold, fontSize: 32 }} />
                  <Box sx={{ flex: 1 }}>
                    <Typography
                      variant="subtitle2"
                      sx={{ mb: 0.5, color: colors.text.secondary }}
                    >
                      GitHub
                    </Typography>
                    <MuiLink
                      href="https://github.com/harry0802"
                      target="_blank"
                      rel="noopener noreferrer"
                      sx={{
                        color: colors.accent.gold,
                        fontWeight: 600,
                        textDecoration: "none",
                        "&:hover": {
                          textDecoration: "underline",
                        },
                      }}
                    >
                      github.com/harry0802
                    </MuiLink>
                  </Box>
                </Box>
              </Box>
            </CreamPaper>
          </Grid>

          {/* Contact Information Form Section */}
          <Grid item xs={12}>
            <CreamPaper elevation={2} sx={{
              clipPath: 'polygon(1rem 0, calc(100% - 1rem) 0, 100% 1rem, 100% calc(100% - 1rem), calc(100% - 1rem) 100%, 1rem 100%, 0 calc(100% - 1rem), 0 1rem)',
            }}>
              <Typography
                variant="h5"
                gutterBottom
                sx={{
                  color: colors.accent.gold,
                  fontWeight: 600,
                  mb: 3,
                }}
              >
                聯絡資訊
              </Typography>

              <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
                <Box>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
                    <EmailIcon sx={{ color: colors.accent.gold }} />
                    <Typography variant="subtitle1" fontWeight={600} sx={{ color: colors.text.primary }}>
                      電子郵件
                    </Typography>
                  </Box>
                  <TextField
                    fullWidth
                    placeholder="請填寫您的電子郵件"
                    variant="outlined"
                    disabled
                  />
                  <Typography
                    variant="caption"
                    sx={{ mt: 0.5, display: "block", fontStyle: "italic", color: colors.text.secondary }}
                  >
                    ※ 此欄位預留給您填寫
                  </Typography>
                </Box>

                <Box>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
                    <PhoneIcon sx={{ color: colors.accent.gold }} />
                    <Typography variant="subtitle1" fontWeight={600} sx={{ color: colors.text.primary }}>
                      電話號碼
                    </Typography>
                  </Box>
                  <TextField
                    fullWidth
                    placeholder="請填寫您的電話號碼"
                    variant="outlined"
                    disabled
                  />
                  <Typography
                    variant="caption"
                    sx={{ mt: 0.5, display: "block", fontStyle: "italic", color: colors.text.secondary }}
                  >
                    ※ 此欄位預留給您填寫
                  </Typography>
                </Box>

                <Box>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
                    <LinkedInIcon sx={{ color: colors.accent.gold }} />
                    <Typography variant="subtitle1" fontWeight={600} sx={{ color: colors.text.primary }}>
                      LinkedIn
                    </Typography>
                  </Box>
                  <TextField
                    fullWidth
                    placeholder="請填寫您的 LinkedIn 個人檔案連結"
                    variant="outlined"
                    disabled
                  />
                  <Typography
                    variant="caption"
                    sx={{ mt: 0.5, display: "block", fontStyle: "italic", color: colors.text.secondary }}
                  >
                    ※ 此欄位預留給您填寫
                  </Typography>
                </Box>
              </Box>
            </CreamPaper>
          </Grid>

          {/* Note Section */}
          <Grid item xs={12}>
            <Box
              sx={{
                p: 2,
                backgroundColor: colors.background.surfaceAlt,
                border: `2px solid ${colors.border.light}`,
                borderLeft: `4px solid ${colors.accent.gold}`,
                borderRadius: 1,
                clipPath: 'polygon(0.75rem 0, calc(100% - 0.75rem) 0, 100% 0.75rem, 100% calc(100% - 0.75rem), calc(100% - 0.75rem) 100%, 0.75rem 100%, 0 calc(100% - 0.75rem), 0 0.75rem)',
              }}
            >
              <Typography
                variant="subtitle1"
                gutterBottom
                sx={{
                  color: colors.accent.gold,
                  fontWeight: 700,
                }}
              >
                📝 提示
              </Typography>
              <Typography variant="body2" sx={{ color: colors.text.primary }}>
                以上欄位預留給您填寫個人聯絡資訊。您可以編輯此頁面來新增您的電子郵件、電話號碼和
                LinkedIn 連結。
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </ThemeProvider>
  );
};

export default Contact;
