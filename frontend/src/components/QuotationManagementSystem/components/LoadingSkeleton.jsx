import { Skeleton, Card, CardContent, Box } from "@mui/material";

export const LoadingSkeleton = () => (
  <Card sx={{ width: "100%", p: 2 }}>
    <CardContent>
      <Skeleton variant="text" width="60%" height={40} sx={{ mb: 2 }} />
      <Box sx={{ mb: 3 }}>
        {[...Array(3)].map((_, index) => (
          <Box key={index} sx={{ mb: 2 }}>
            <Skeleton variant="rectangular" width="100%" height={80} />
          </Box>
        ))}
      </Box>
      <Skeleton variant="rectangular" width="100%" height={100} />
    </CardContent>
  </Card>
);
