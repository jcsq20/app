import {
  Button,
  ButtonProps,
  HStack,
  IconButton,
  Input,
  StackProps,
} from '@chakra-ui/react';

import { memo, useCallback, useMemo } from 'react';
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md';
import * as Styles from './styles';

const rulerSize = 5;

export interface UiPaginatorProps extends StackProps {
  colorScheme?: ButtonProps['colorScheme'];
  size?: ButtonProps['size'];
  totalPages: number;
  page?: number;
  onPageChange?: (page: number) => unknown;
}

const UiPaginator: React.FC<UiPaginatorProps> = ({
  totalPages,
  page = 1,
  onPageChange = () => undefined,
  colorScheme = 'primary',
  size = 'md',
  ...stackProps
}) => {
  const calculateCurrentPage = useCallback(() => {
    let newPage = page;
    if (page <= 1) {
      newPage = 1;
    } else if (page >= totalPages) {
      newPage = totalPages;
    }

    return newPage;
  }, [page, totalPages]);

  const currentPage = calculateCurrentPage();

  const minValues = useMemo(
    () =>
      Array.from(
        { length: totalPages <= rulerSize ? totalPages : rulerSize },
        (_e, i) => i + 1,
      ),
    [totalPages],
  );

  const maxValues = useMemo(
    () =>
      Array.from(
        { length: totalPages <= rulerSize ? totalPages : rulerSize },
        (_e, i) => totalPages - i,
      ).reverse(),
    [totalPages],
  );

  const discoverMid = useCallback(() => {
    if (totalPages <= rulerSize + 2) {
      return Array.from(new Set([...minValues, ...maxValues]));
    }

    if (minValues.includes(currentPage) && currentPage < rulerSize) {
      return minValues;
    }

    if (
      currentPage >= rulerSize &&
      rulerSize + 2 !== totalPages &&
      !maxValues.includes(currentPage)
    ) {
      return [currentPage - 1, currentPage, currentPage + 1];
    }

    return maxValues;
  }, [currentPage, totalPages, minValues, maxValues]);

  const shouldCompressLeft = useMemo(
    () => totalPages > rulerSize + 2 && currentPage >= rulerSize,
    [totalPages, currentPage],
  );

  const shouldCompressRight = useMemo(
    () =>
      totalPages > rulerSize + 2 &&
      (!maxValues.includes(currentPage) || currentPage <= 4),
    [totalPages, maxValues, currentPage],
  );

  const midPagesArray: number[] = useMemo(discoverMid, [discoverMid]);

  const handleInputSize = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      e.target.style.width = `${e.target.value.toString().length}ch`;
    },
    [],
  );

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.valueAsNumber >= 1 && e.target.valueAsNumber <= totalPages) {
        onPageChange(e.target.valueAsNumber);
      } else {
        e.target.valueAsNumber = currentPage;
      }
      handleInputSize(e);
    },
    [totalPages, handleInputSize, onPageChange, currentPage],
  );

  return (
    <HStack {...stackProps}>
      <IconButton
        size={size}
        data-testid="@leftArrow"
        aria-label="leftArrow"
        variant="outline"
        colorScheme={colorScheme}
        isDisabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
        icon={<MdKeyboardArrowLeft />}
      />

      {shouldCompressLeft && (
        <>
          <Button
            size={size}
            data-testid="@startPage"
            onClick={() => onPageChange(1)}
            variant="outline"
            colorScheme="neutral"
          >
            1
          </Button>
          <Styles.DotsBtn
            data-testid="@startDots"
            size={size}
            variant="unstyled"
            tabIndex={-1}
          />
        </>
      )}
      {midPagesArray.map((value) => (
        <Button
          size={size}
          data-testid={`@midPage${value}`}
          as="div"
          flexShrink={1}
          colorScheme={value === currentPage ? colorScheme : 'neutral'}
          cursor="pointer"
          tabIndex={value === currentPage ? -1 : 0}
          variant={value === currentPage ? 'solid' : 'outline'}
          key={value}
          onClick={() => {
            onPageChange(value);
          }}
        >
          {value === currentPage ? (
            <Input
              size={size}
              data-testid="@pageInput"
              textAlign="center"
              variant="unstyled"
              fontWeight="600"
              w={`${currentPage.toString().length}ch`}
              type="number"
              onChange={handleInputSize}
              defaultValue={value}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleInputChange(
                    e as unknown as React.ChangeEvent<HTMLInputElement>,
                  );
                }
              }}
              onBlur={handleInputChange}
            />
          ) : (
            value
          )}
        </Button>
      ))}

      {shouldCompressRight && (
        <>
          <Styles.DotsBtn
            data-testid="@endDots"
            size={size}
            variant="unstyled"
            tabIndex={-1}
          />
          <Button
            size={size}
            data-testid="@endPage"
            onClick={() => onPageChange(totalPages)}
            variant="outline"
            colorScheme="neutral"
          >
            {totalPages}
          </Button>
        </>
      )}

      <IconButton
        size={size}
        data-testid="@rightArrow"
        aria-label="rightArrow"
        variant="outline"
        colorScheme={colorScheme}
        isDisabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
        icon={<MdKeyboardArrowRight />}
      />
    </HStack>
  );
};

export default memo(UiPaginator);
