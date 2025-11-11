import React from "react";
import {
  Container,
  Typography,
  Box,
  Paper,
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

const Contact = () => {
  return (
    <ThemeProvider theme={muiTheme}>
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Typography
          variant="h3"
          component="h1"
          gutterBottom
          sx={{
            fontWeight: 700,
            color: "primary.main",
            mb: 3,
            textAlign: "center",
          }}
        >
          聯絡方式
        </Typography>

        <Paper
          elevation={0}
          sx={{
            mb: 4,
            p: 3,
            background:
              "linear-gradient(135deg, rgba(97, 218, 251, 0.15), rgba(58, 133, 137, 0.10))",
            borderLeft: 4,
            borderColor: "primary.main",
            borderRadius: 2,
          }}
        >
          <Typography variant="body1" color="text.secondary" align="center">
            歡迎透過以下方式與我聯繫，我很樂意與您討論專案合作或技術交流的機會。
          </Typography>
        </Paper>

        <Grid container spacing={3}>
          {/* Social Links Section */}
          <Grid item xs={12}>
            <Paper
              elevation={2}
              sx={{
                p: 3,
                borderLeft: 4,
                borderColor: "primary.main",
              }}
            >
              <Typography
                variant="h5"
                gutterBottom
                sx={{
                  color: "primary.main",
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
                    background: "rgba(97, 218, 251, 0.08)",
                    borderRadius: 2,
                    transition: "all 0.3s ease",
                    "&:hover": {
                      background: "rgba(97, 218, 251, 0.15)",
                    },
                  }}
                >
                  <GitHubIcon sx={{ color: "primary.main", fontSize: 32 }} />
                  <Box sx={{ flex: 1 }}>
                    <Typography
                      variant="subtitle2"
                      color="text.secondary"
                      sx={{ mb: 0.5 }}
                    >
                      GitHub
                    </Typography>
                    <MuiLink
                      href="https://github.com/harry0802"
                      target="_blank"
                      rel="noopener noreferrer"
                      sx={{
                        color: "primary.main",
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
            </Paper>
          </Grid>

          {/* Contact Information Form Section */}
          <Grid item xs={12}>
            <Paper
              elevation={2}
              sx={{
                p: 3,
                borderLeft: 4,
                borderColor: "primary.main",
              }}
            >
              <Typography
                variant="h5"
                gutterBottom
                sx={{
                  color: "primary.main",
                  fontWeight: 600,
                  mb: 3,
                }}
              >
                聯絡資訊
              </Typography>

              <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
                <Box>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
                    <EmailIcon sx={{ color: "primary.main" }} />
                    <Typography variant="subtitle1" fontWeight={600}>
                      電子郵件
                    </Typography>
                  </Box>
                  <TextField
                    fullWidth
                    placeholder="請填寫您的電子郵件"
                    variant="outlined"
                    disabled
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        backgroundColor: "rgba(0, 0, 0, 0.02)",
                      },
                    }}
                  />
                  <Typography
                    variant="caption"
                    color="text.secondary"
                    sx={{ mt: 0.5, display: "block", fontStyle: "italic" }}
                  >
                    ※ 此欄位預留給您填寫
                  </Typography>
                </Box>

                <Box>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
                    <PhoneIcon sx={{ color: "primary.main" }} />
                    <Typography variant="subtitle1" fontWeight={600}>
                      電話號碼
                    </Typography>
                  </Box>
                  <TextField
                    fullWidth
                    placeholder="請填寫您的電話號碼"
                    variant="outlined"
                    disabled
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        backgroundColor: "rgba(0, 0, 0, 0.02)",
                      },
                    }}
                  />
                  <Typography
                    variant="caption"
                    color="text.secondary"
                    sx={{ mt: 0.5, display: "block", fontStyle: "italic" }}
                  >
                    ※ 此欄位預留給您填寫
                  </Typography>
                </Box>

                <Box>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
                    <LinkedInIcon sx={{ color: "primary.main" }} />
                    <Typography variant="subtitle1" fontWeight={600}>
                      LinkedIn
                    </Typography>
                  </Box>
                  <TextField
                    fullWidth
                    placeholder="請填寫您的 LinkedIn 個人檔案連結"
                    variant="outlined"
                    disabled
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        backgroundColor: "rgba(0, 0, 0, 0.02)",
                      },
                    }}
                  />
                  <Typography
                    variant="caption"
                    color="text.secondary"
                    sx={{ mt: 0.5, display: "block", fontStyle: "italic" }}
                  >
                    ※ 此欄位預留給您填寫
                  </Typography>
                </Box>
              </Box>
            </Paper>
          </Grid>

          {/* Note Section */}
          <Grid item xs={12}>
            <Paper
              elevation={0}
              sx={{
                p: 2,
                background: "rgba(97, 218, 251, 0.10)",
                borderLeft: 4,
                borderColor: "primary.main",
                borderRadius: 2,
              }}
            >
              <Typography
                variant="subtitle1"
                gutterBottom
                sx={{
                  color: "primary.main",
                  fontWeight: 700,
                }}
              >
                📝 提示
              </Typography>
              <Typography variant="body2" color="text.secondary">
                以上欄位預留給您填寫個人聯絡資訊。您可以編輯此頁面來新增您的電子郵件、電話號碼和
                LinkedIn 連結。
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </ThemeProvider>
  );
};

export default Contact;
