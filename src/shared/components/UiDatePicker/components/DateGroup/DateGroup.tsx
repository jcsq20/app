import { Box, Flex, Stack } from '@chakra-ui/react';

interface DateGroupProps {
  title: string;
  children?: React.ReactNode;
}

const DateGroup: React.FC<DateGroupProps> = ({ title, children }) => (
  <Stack>
    <Flex flexDirection="row" justifyContent="center" alignItems="center">
      <Box mt={2} textAlign="center" fontWeight="semibold">
        {title}
      </Box>
    </Flex>
    <Flex>{children}</Flex>
  </Stack>
);

export default DateGroup;
